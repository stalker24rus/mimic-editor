import SimpleSpliter from "../SimpleSpliter";

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
        PROJECT TREE
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "yellow",
        }}
      >
        PROPERTIES
      </div>
    </SimpleSpliter>
  );
}

export default EditorPanel;
