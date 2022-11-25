import React from "react";
import { connect } from "react-redux";
import { Attributes } from "../../../models/Editor";
import CursorInfo from "../CursorInfo";

export const MIMIC_FRAME_ID: string = "mimic.frame";

interface StateProps {
  attributes: Attributes;
  mode: CanvasMode;
  drawId: number;
}

interface DispatchProps {
  onCreateEl: Function;
  onAppendPointToEl: Function;
  onEndDrawingElement: Function;
  onDrawingElement: Function;
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

const mapDispatchToProps = (dispatch: Function, getState: any) => ({
  onCreateEl: (payload: PayloadProps) =>
    dispatch({ type: "CREATE_ELEMENT_OR_APPEND_POINT", payload }),
  onAppendPointToEl: (payload: PayloadProps) =>
    dispatch({ type: CREATE_ELEMENT, payload }),
  onEndDrawingElement: (payload: PayloadProps) =>
    dispatch({ type: SET_LAST_TAKEN_ID, payload }),
  onDrawingElement: (payload: PayloadProps) => dispatch({ type: "", payload }),
  onUnFreezeHistory: (payload: PayloadProps) => dispatch({ type: "", payload }),
});

const CREATE_MODE = "CREATE";

function MimicCanvas(props: Props): JSX.Element {
  const { mode, drawId, attributes, children } = props;

  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;
  const { name } = general;

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    const { detail } = ev;
    switch (detail) {
      // simple click
      case 1: {
        if (mode !== CREATE_MODE) return;
        if (!drawId) {
          props.onCreateEl(ev);
        } else {
          props.onAppendPointToEl(ev);
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
