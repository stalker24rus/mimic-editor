import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../constants/literals";
import { IMimicElement } from "../../models/Editor";
import { setViewPosition } from "../../store/actionCreators/editorState";
import {
  selectEditorMode,
  selectSelectedElements,
} from "../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../store/selectors/editorElements";

import CursorInfo from "./CursorInfo";
import { useDrawElement } from "../Hooks/useDraw";
import KeyListener from "./KeyListener";

import ObjectSelector from "./ObjectSelector";
import PointListener from "./PointListener";
import { useTypedDispatch } from "../../store";

const Mimic = (): JSX.Element => {
  const mimic = useSelector(selectMimic);
  const elements = useSelector(selectEditorElements);
  const mode = useSelector(selectEditorMode);
  // const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const [Element] = useDrawElement();

  function handleResize() {
    const htmlRect = document
      .getElementById(mimic.type)
      ?.getBoundingClientRect();

    if (htmlRect) {
      const { x, y } = htmlRect;

      dispatch(setViewPosition({ x, y }));
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  const handleScroll = useCallback(
    (ev) => {
      ev.preventDefault();
      handleResize();
    },
    [handleResize]
  );

  const memoElements = useMemo(
    () =>
      elements.map((element: IMimicElement, index: number) => {
        return <Element key={index} element={element} />;
      }),
    [elements]
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
      <KeyListener />
      <PointListener>
        <ObjectSelector>
          {elements.length > 0 && <>{memoElements}</>}
          {/* <EditorContextMenu /> */}

          {mode === EDITOR_MODE_CREATE && <CursorInfo />}
        </ObjectSelector>
      </PointListener>
    </div>
  );
};

export default Mimic;
