import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MIMIC } from "../../../constants/literals";
import { Attributes } from "../../../models/Editor";
import {
  appendPointToElement,
  createElement,
  drawingElement,
  endDrawingElement,
} from "../../../store/actionCreators/editorElements";
import { selectElement } from "../../../store/actionCreators/editorState";
import CursorInfo from "../CursorInfo";

export const MIMIC_FRAME_ID: string = "mimic.frame";

interface StateProps {
  attributes: Attributes;
  mode: CanvasMode;
  drawId: number;
}

interface DispatchProps {
  onCreateElement: Function;
  onAppendPointToElement: Function;
  onEndDrawingElement: Function;
  onDrawingElement: Function;
  onSelectElement: Function;
  onUnFreezeHistory: Function;
}

interface OwnProps {
  children: JSX.Element | JSX.Element[];
}

interface PayloadProps {
  [key: string]: any;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    attributes: store.mimic.frame.attributes,
    mode: store.mimic.canvas.mode,
    drawId: 0,
  };
}

function mapDispatchToProps() {
  return {
    onCreateElement: createElement,
    onAppendPointToElement: appendPointToElement,
    onEndDrawingElement: endDrawingElement,
    onDrawingElement: drawingElement,
    onSelectElement: selectElement,
    onUnFreezeHistory: () => {},
  };
}
const CREATE_MODE = "CREATE";

function MimicCanvas(props: Props): JSX.Element {
  const { mode, drawId, attributes, children } = props;

  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;
  const { name } = general;

  useEffect(() => {
    function selectComponent({ clientX, clientY }) {
      const elements = document.elementsFromPoint(clientX, clientY);
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          props.onSelectElement(id);
          break;
        }
      }
    }
    window.addEventListener("click", selectComponent);
  }, []);

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    const { detail } = ev;
    switch (detail) {
      // simple click
      case 1: {
        if (mode !== CREATE_MODE) return;
        if (!drawId) {
          const { clientX, clientY } = ev;
          props.onCreateElement(ev);
        } else {
          props.onAppendPointToElement(ev);
        }
        break;
      }

      case 2: {
        if (!drawId || mode !== CREATE_MODE) return;
        props.onEndDrawingElement(ev);
        break;
      }
      default: {
        break;
      }
    }
  };

  // const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
  //   props.onUnFreezeHistory();
  // };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!drawId) return;
    props.onDrawingElement(ev);
  };
  const handlePointerUp = () => {
    props.onUnFreezeHistory();
  };

  return (
    <div
      id={name}
      style={{
        position: "relative",
        width: width,
        height: height,
        overflow: "scroll",
        background: fill,
        cursor: mode === CREATE_MODE ? "crosshair" : "auto",
      }}
      // onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      <div style={{ pointerEvents: "none" }}>{children}</div>
      {mode === CREATE_MODE && <CursorInfo />}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MimicCanvas);
