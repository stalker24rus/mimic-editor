import { useEffect, useState } from "react";
import EditorContextMenu from "../../Editor/EditorContextMenu";
import EditorInstrumentPanel from "../../Editor/EditorInstrumentPanel";
import EditorPanel from "../../Editor/EditorPanel";
import SimpleSpliter from "../../Editor/SimpleSpliter";
import Mimic from "../../Mimic";
import "./index.css";

const HEADER_HEIGHT = 52;

function Editor() {
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
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: HEADER_HEIGHT,
        }}
      >
        <EditorInstrumentPanel />
      </div>

      <div
        style={{
          height: height - HEADER_HEIGHT, //"1000px",
        }}
      >
        <SimpleSpliter isHorizontally={true}>
          <SimpleSpliter isHorizontally={false} split="horizontal">
            <Mimic />
            <EditorPanel />
          </SimpleSpliter>
          <>SIMULATOR</>
        </SimpleSpliter>
      </div>

      <EditorContextMenu />
    </div>
  );
}

export default Editor;
