import { useCallback, useEffect, useState } from "react";
import { EDITOR_MODE_CREATE, HEADER_HEIGHT } from "../../constants/literals";
import Header from "./views/Header";
import InstrumentPanel from "./views/InstrumentPanel";
import SimpleSplitter from "../../ui/SimpleSplitter";

import "./MimicEditor.css";
import KeyEventListener from "./views/KeyEventListener";
import Canvas from "./views/Canvas";
import PointEventListener from "./views/PointEventListener";
import SelectionArea from "./views/SelectionArea";
import ShapeTransformer from "./views/ShapeTransformer";
import GroupMover from "./views/GroupMover";
import CursorInfo from "./views/CursorInfo";
import { selectMimic } from "../../store/selectors/editorElements";
import {
  selectEditorMode,
  selectSelectedElements,
} from "../../store/selectors/editorState";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../store";
import { setViewPosition } from "../../store/actionCreators/editorState";
import Visualizer from "./views/Visualizer";

/**
 * There is a mnemonic editor.
 * This module provides functions for viewing and creating vector graphics for SCADA.
 *
 * @returns {JSX.Element}
 */
export default function MimicEditor(): JSX.Element {
  const mimic = useSelector(selectMimic);
  const mode = useSelector(selectEditorMode);
  const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  function updateSize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  function updateViewPosition() {
    const htmlRect = document
      .getElementById(mimic.type)
      ?.getBoundingClientRect();

    if (htmlRect) {
      const { x, y } = htmlRect;

      dispatch(setViewPosition({ x, y }));
    }
  }

  function update() {
    updateSize();
    updateViewPosition();
  }

  useEffect(() => {
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [window.innerWidth, window.innerHeight]);

  const handleScroll = useCallback(
    (ev) => {
      ev.preventDefault();
      updateViewPosition();
    },
    [updateViewPosition]
  );

  return (
    <div
      className="editor"
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      <KeyEventListener />
      <Header />
      <div style={{ height: height - HEADER_HEIGHT }}>
        <SimpleSplitter orientation="vertical">
          <Canvas
            mainElement={mimic}
            cursor={mode === EDITOR_MODE_CREATE ? "crosshair" : "auto"}
            onScroll={handleScroll}
          >
            <Visualizer elements={mimic.children} />
            <PointEventListener>
              <SelectionArea />
              <ShapeTransformer elements={mimic.children} selected={selected} />
              <GroupMover />
              <CursorInfo />
            </PointEventListener>
          </Canvas>
          <InstrumentPanel />
        </SimpleSplitter>
      </div>
    </div>
  );
}
