import Primitives from "./Primitives";
import SimpleSpliter from "../SimpleSpliter";
import Properties from "./Properties";

function EditorPanel() {
  return (
    <SimpleSpliter isHorizontally={true} defaaultPos={30}>
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
    </SimpleSpliter>
  );
}

export default EditorPanel;
