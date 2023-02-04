import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../constants/literals";
import { IPoint } from "../../../models/Editor";
import { useTypedDispatch } from "../../../store";
import {
  appendPointToElement,
  createElement,
  drawingElement,
  endDrawingElement,
} from "../../../store/actionCreators/editorElements";
import { selectMimic } from "../../../store/selectors/editorElements";
import { selectEditorMode } from "../../../store/selectors/editorState";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function PointListener(props: Props): JSX.Element {
  const { children } = props;

  const mimic = useSelector(selectMimic);
  const mode = useSelector(selectEditorMode);
  const drawId = useSelector((store: any) => store.editorState.drawId);
  const dispatch = useTypedDispatch();

  const { attributes, type: mimicFrameType } = mimic;
  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const { detail } = ev;
    switch (detail) {
      case 1: {
        if (mode !== EDITOR_MODE_CREATE) return;
        const { clientX, clientY } = ev;
        const point: IPoint = {
          x: clientX,
          y: clientY,
        };

        if (!drawId) {
          dispatch(createElement(point));
        } else {
          dispatch(appendPointToElement(drawId, point));
        }
        break;
      }

      case 2: {
        if (!drawId || mode !== EDITOR_MODE_CREATE) return;
        dispatch(endDrawingElement(drawId));
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
    const point: IPoint = {
      x: clientX,
      y: clientY,
    };
    dispatch(drawingElement(drawId, point));
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

export default PointListener;
