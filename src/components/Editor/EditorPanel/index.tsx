import Primitives from "./Primitives";
import SimpleSplitter from "../SimpleSplitter";
import Properties from "./Properties";

function EditorPanel() {
  return (
    <SimpleSplitter orientation="horizontal" defaultRatio={30}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#727272",
        }}
      >
        <Primitives></Primitives>
      </div>
      <Properties />
    </SimpleSplitter>
  );
}

export default EditorPanel;
