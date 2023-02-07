import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../../constants/literals";
import { useTypedDispatch } from "../../../../store";
import {
  onCanvasPointerClick,
  onCanvasPointerDown,
  onCanvasPointerMove,
  onCanvasPointerUp,
} from "../../../../store/actionCreators/editorCanvasPointEvent";
import { selectMimic } from "../../../../store/selectors/editorElements";
import { selectEditorMode } from "../../../../store/selectors/editorState";
import CursorInfo from "../CursorInfo";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function PointEventListener(props: Props): JSX.Element {
  const { children } = props;

  const mimic = useSelector(selectMimic);
  const mode = useSelector(selectEditorMode);
  const dispatch = useTypedDispatch();

  const { attributes, type: mimicFrameType } = mimic;
  const { position } = attributes;
  const { width, height } = position;

  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(onCanvasPointerClick(ev));
  };

  const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(onCanvasPointerDown(ev));
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(onCanvasPointerMove(ev));
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(onCanvasPointerUp(ev));
  };

  return (
    <div
      id={mimicFrameType}
      style={{
        position: "absolute",
        width: width,
        height: height,

        cursor: mode === EDITOR_MODE_CREATE ? "crosshair" : "auto",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
