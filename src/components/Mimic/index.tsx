import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../constants/literals";
import { IMimicElement } from "../../models/Editor";
import { setViewPosition } from "../../store/actionCreators/editorState";
import { selectEditorMode } from "../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../store/selectors/editorElements";

import CursorInfo from "../Editor/views/CursorInfo";
import { useDrawElement } from "../../hooks/useDraw";
import KeyEventListener from "../Editor/views/KeyEventListener";

import ObjectSelector from "../Editor/views/ObjectSelector";
import PointEventListener from "../Editor/views/PointEventListener";
import { useTypedDispatch } from "../../store";

const Mimic = (): JSX.Element => {
  const mimic = useSelector(selectMimic);
  const elements = useSelector(selectEditorElements);
  const mode = useSelector(selectEditorMode);
  const dispatch = useTypedDispatch();

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
        touchAction: "none", //isMimicTouch ? "auto" : "none",
      }}
      onScroll={handleScroll}
    >
      <KeyEventListener />
      <PointEventListener>
        <ObjectSelector>
          {elements.length > 0 && <>{Visualizer}</>}
          {/* <EditorContextMenu /> */}

          {mode === EDITOR_MODE_CREATE && <CursorInfo />}
        </ObjectSelector>
      </PointEventListener>
    </div>
  );
};

export default Mimic;
