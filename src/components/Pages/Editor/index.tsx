import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../../../constants/literals";
import EditorContextMenu from "../../Editor/EditorContextMenu";
import EditorHeader from "../../Editor/EditorHeader";
import EditorPanel from "../../Editor/EditorPanel";
import SimpleSplitter from "../../Editor/SimpleSplitter";
import Mimic from "../../Mimic";
import "./index.css";

function Editor(): JSX.Element {
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
          <Mimic />
          <EditorPanel />
        </SimpleSplitter>
      </div>

      <EditorContextMenu />
    </div>
  );
}

export default Editor;
