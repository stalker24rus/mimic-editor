import { useEffect } from "react";
import { useTypedDispatch } from "../../../../store";
import {
  deleteSelectedElements,
  moveElementGroup,
  pasteElements,
  redo,
  undo,
} from "../../../../store/actionCreators/editorElements";
import {
  copyElements,
  removeSelection,
} from "../../../../store/actionCreators/editorState";

export default function KeyEventListener(): JSX.Element {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // FIXME -> Any
    const keyListener = (ev: any) => {
      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "Z" || ev.key === "z" || ev.code === "KeyZ")
      ) {
        if (ev.shiftKey) {
          dispatch(redo());
        } else {
          dispatch(undo());
        }
      }

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "A" || ev.key === "a" || ev.code === "KeyA")
      ) {
        // console.log(ev, ev.key);
      }

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "C" || ev.key === "c" || ev.code === "KeyC")
      ) {
        dispatch(copyElements());
      }

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "V" || ev.key === "v" || ev.code === "KeyV")
      ) {
        dispatch(pasteElements());
      }

      if (ev.key === "Delete" || ev.code === "Delete") {
        dispatch(deleteSelectedElements());
      }

      if (ev.key === "Escape" || ev.code === "Escape") {
        dispatch(removeSelection());
      }

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        dispatch(moveElementGroup({ x: -1, y: 0 }));
      }

      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        dispatch(moveElementGroup({ x: 1, y: 0 }));
      }

      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        dispatch(moveElementGroup({ x: 0, y: -1 }));
      }

      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        dispatch(moveElementGroup({ x: 0, y: 1 }));
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  });

  return null;
}
