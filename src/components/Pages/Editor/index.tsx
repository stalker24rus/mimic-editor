import EditorContextMenu from "../../Editor/EditorContextMenu";
import EditorInstrumentPanel from "../../Editor/EditorInstrumentPanel";
import Mimic from "../../Mimic";
import "./index.css";

function Editor() {
  return (
    <div>
      <EditorInstrumentPanel />
      <Mimic />
      <EditorContextMenu />
    </div>
  );
}

export default Editor;
