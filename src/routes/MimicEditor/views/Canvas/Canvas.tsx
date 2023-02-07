import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../../../constants/literals";
import { IMimicElement } from "../../../../models/Editor";
import { setViewPosition } from "../../../../store/actionCreators/editorState";
import { selectEditorMode } from "../../../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../../../store/selectors/editorElements";

import { useDrawElement } from "../../../../hooks/useDraw";

import { useTypedDispatch } from "../../../../store";

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

export default function Canvas({ children }: Props): JSX.Element {
  const mimic = useSelector(selectMimic);
  const elements = useSelector(selectEditorElements);
  const mode = useSelector(selectEditorMode);
  const dispatch = useTypedDispatch();

  const { attributes } = mimic;
  const { position, appearance, general } = attributes;
  const { width, height } = position;
  const { fill } = appearance;

  const [Element] = useDrawElement();

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

  const Visualizer = useMemo(
    () =>
      elements.map((element: IMimicElement) => {
        const { type } = element;
        const { id } = element.attributes.general;
        return <Element key={type + id} element={element} />;
      }),
    [elements, Element]
  );

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
        {elements.length > 0 && <>{Visualizer}</>}
        {children}
      </div>
    </div>
  );
}
