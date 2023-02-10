import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../../constants/literals";
import { IPoint } from "../../../../models/Editor";
import {
  selectEditorMode,
  selectCanvasRectPosition,
} from "../../../../store/selectors/editorState";

export default function CursorInfo(): JSX.Element {
  const mode = useSelector(selectEditorMode);
  const viewPosition = useSelector(selectCanvasRectPosition);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    // FIXME
    const update = (ev: any) => {
      const { clientX, clientY } = ev;

      const x = clientX - viewPosition.x + 10;
      const y = clientY - viewPosition.y + 5;

      setX(x);
      setY(y);
    };

    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [setX, setY, viewPosition]);

  return (
    <>
      {mode === EDITOR_MODE_CREATE && (
        <div
          className="w-100 h-100 bg-stone-50 rounded-md"
          style={{
            position: "absolute",
            top: y,
            left: x,
          }}
        >
          {x}:{y}
        </div>
      )}
    </>
  );
}
