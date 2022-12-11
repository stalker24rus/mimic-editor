import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { EDITOR_MODE_CREATE, MIMIC } from "../../../constants/literals";
import {
  Attributes,
  EditorModeProps,
  PointFromat,
} from "../../../models/Editor";
import {
  appendPointToElement,
  createElement,
  drawingElement,
  endDrawingElement,
} from "../../../store/actionCreators/editorElements";
import {
  selectElement,
  setViewPosition,
} from "../../../store/actionCreators/editorState";
import CursorInfo from "../CursorInfo";
import ObjectSelector from "../ObjectSelector";

interface StateProps {
  attributes: Attributes;
  mode: EditorModeProps;
  drawId: number;
}

interface DispatchProps {
  onCreateElement: Function;
  onAppendPointToElement: Function;
  onEndDrawingElement: Function;
  onDrawingElement: Function;
  onSelectElement: Function;
  onSetViewPosition: Function;
}

interface OwnProps {
  children: JSX.Element | JSX.Element[];
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    attributes: store.editorState.currentMimic.attributes,
    mode: store.editorState.mode,
    drawId: store.editorState.drawId,
  };
}

function mapDispatchToProps() {
  return {
    onCreateElement: createElement,
    onAppendPointToElement: appendPointToElement,
    onEndDrawingElement: endDrawingElement,
    onDrawingElement: drawingElement,
    onSelectElement: selectElement,
    onSetViewPosition: setViewPosition,
  };
}

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
          props.onSelectElement([parseInt(id)]);
          break;
        }
        // else {
        //   props.onSelectElement([]);
        //   break;
        // }
      }
    }

    // FIXME  FIRST !!!!!!!!!!!!!!!!!
    function handleResize() {
      const htmlRect = document.getElementById(name)?.getBoundingClientRect();

      if (htmlRect) {
        const { x, y } = htmlRect;
        props.onSetViewPosition({ x, y });
      }
    }

    window.addEventListener("click", selectComponent);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("click", selectComponent);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    const { detail } = ev;
    switch (detail) {
      case 1: {
        if (mode !== EDITOR_MODE_CREATE) return;
        const { clientX, clientY } = ev;
        const point: PointFromat = {
          x: clientX,
          y: clientY,
        };

        if (!drawId) {
          props.onCreateElement(point);
        } else {
          props.onAppendPointToElement(drawId, point);
        }
        break;
      }

      case 2: {
        if (!drawId || mode !== EDITOR_MODE_CREATE) return;
        props.onEndDrawingElement(drawId);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!drawId) return;
    const { clientX, clientY } = ev;
    const point: PointFromat = {
      x: clientX,
      y: clientY,
    };
    props.onDrawingElement(drawId, point);
  };

  const handlePointerUp = () => {};

  return (
    <div
      id={name}
      style={{
        position: "relative",
        width: width,
        height: height,
        overflow: "scroll",
        background: fill,
        cursor: mode === EDITOR_MODE_CREATE ? "crosshair" : "auto",
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      <ObjectSelector>
        <div style={{ pointerEvents: "none" }}>{children}</div>
        {mode === EDITOR_MODE_CREATE && <CursorInfo />}
      </ObjectSelector>
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(MimicCanvas);
