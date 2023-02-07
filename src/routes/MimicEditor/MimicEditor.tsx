import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../../constants/literals";
import Header from "./views/Header";
import InstrumentPanel from "./views/InstrumentPanel";
import SimpleSplitter from "../../ui/SimpleSplitter";

import "./MimicEditor.css";
import KeyEventListener from "./views/KeyEventListener";
import Canvas from "./views/Canvas";
import PointEventListener from "./views/PointEventListener";
import SelectionArea from "./views/SelectionArea";
import ShapeChangerLayer from "./views/ShapeChangerLayer";
import GroupMover from "./views/GroupMover";
import CursorInfo from "./views/CursorInfo";

/**
 * There is a mnemonic editor.
 * This module provides functions for viewing and creating vector graphics for SCADA.
 *
 * @returns {JSX.Element}
 */
export default function MimicEditor(): JSX.Element {
  // Options for Responsive View
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

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
          <Canvas>
            <PointEventListener>
              <SelectionArea />
              <ShapeChangerLayer />
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
