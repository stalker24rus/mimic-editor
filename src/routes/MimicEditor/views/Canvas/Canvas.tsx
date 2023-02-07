import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../../constants/literals";
import { setViewPosition } from "../../../../store/actionCreators/editorState";
import { selectEditorMode } from "../../../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../../../store/selectors/editorElements";

import { useTypedDispatch } from "../../../../store";
import Visualizer from "./views/Visualizer";

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

export default function Canvas({ children }: Props): JSX.Element {
  const mimic = useSelector(selectMimic);
  const mode = useSelector(selectEditorMode);
  const dispatch = useTypedDispatch();

  const { attributes } = mimic;
  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;

  const handleResize = useCallback(() => {
    const htmlRect = document
      .getElementById(mimic.type)
      ?.getBoundingClientRect();

    if (htmlRect) {
      const { x, y } = htmlRect;

      dispatch(setViewPosition({ x, y }));
    }
  }, [dispatch, mimic.type]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleScroll = useCallback(
    (ev) => {
      ev.preventDefault();
      handleResize();
    },
    [handleResize]
  );

  const elements = useSelector(selectEditorElements);

  return (
    <div
      className="noselect"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        touchAction: "none",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          position: "relative",
          width: width,
          height: height,
          background: fill,
          cursor: mode === EDITOR_MODE_CREATE ? "crosshair" : "auto",
        }}
      >
        <Visualizer elements={elements} />
        {children}
      </div>
    </div>
  );
}
