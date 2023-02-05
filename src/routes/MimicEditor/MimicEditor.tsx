import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../../constants/literals";
import EditorHeader from "../../components/Editor/EditorHeader";
import EditorPanel from "../../components/Editor/EditorPanel";
import SimpleSplitter from "../../ui/SimpleSplitter";
import Canvas from "../../components/Canvas";
import "./MimicEditor.css";

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
  }, []);

  return (
    <div
      className="editor"
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      <EditorHeader />

      <div style={{ height: height - HEADER_HEIGHT }}>
        <SimpleSplitter orientation="vertical">
          <Canvas />
          <EditorPanel />
        </SimpleSplitter>
      </div>
    </div>
  );
}
