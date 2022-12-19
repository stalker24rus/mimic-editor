import EditorContextMenu from "../../Editor/EditorContextMenu";
import EditorInstrumentPanel from "../../Editor/EditorInstrumentPanel";
import WindowSplitter from "../../Editor/WindowSplitter";
import Mimic from "../../Mimic";
import "./index.css";

function Editor() {
  return (
    <div>
      <EditorInstrumentPanel />
      <div
      // style={{
      //   position: "relative",
      //   left: "100px",
      //   height: "70%",
      //   width: "70%",
      // }}
      >
        <WindowSplitter isHorizontally={false}>
          <Mimic />
          <div>Thirt</div>
        </WindowSplitter>
      </div>
      <EditorContextMenu />
    </div>
  );
}

export default Editor;
