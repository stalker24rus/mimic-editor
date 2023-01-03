import { connect } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../constants/literals";
import {
  Attributes,
  EditorModeProps,
  MimicElementProps,
  PointFromat,
} from "../../../models/Editor";
import {
  appendPointToElement,
  createElement,
  drawingElement,
  endDrawingElement,
} from "../../../store/actionCreators/editorElements";
import { setViewPosition } from "../../../store/actionCreators/editorState";
import {
  selectMimic,
  selectMimicAttributes,
} from "../../../store/selectors/editorElements";

interface StateProps {
  // attributes: Attributes;
  mimic: MimicElementProps;
  mode: EditorModeProps;
  drawId: number;
}

interface DispatchProps {
  onCreateElement: Function;
  onAppendPointToElement: Function;
  onEndDrawingElement: Function;
  onDrawingElement: Function;
  onSetViewPosition: Function;
}

interface OwnProps {
  children: JSX.Element | JSX.Element[];
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    // attributes: selectMimicAttributes(store), //store.editorState.currentMimic.attributes,
    mimic: selectMimic(store),
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
    onSetViewPosition: setViewPosition,
  };
}

function PointListener(props: Props): JSX.Element {
  const { mode, drawId, mimic, children } = props;
  const { attributes, type: mimicFrameType } = mimic;
  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;
  const { name } = general;

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
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
      id={mimicFrameType}
      style={{
        position: "relative",
        width: width,
        height: height,
        background: fill,
        cursor: mode === EDITOR_MODE_CREATE ? "crosshair" : "auto",
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(PointListener);
