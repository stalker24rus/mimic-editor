import Primitives from "./Primitives";
import SimpleSplitter from "../SimpleSplitter";
import Properties from "./Properties";

/**
 * The EditorPanel is a component for Editor module.
 * It provides functionality for changing Editor states.
 *
 * @returns {JSX.Element}
 */
function EditorPanel(): JSX.Element {
  return (
    <SimpleSplitter orientation="horizontal" defaultRatio={25}>
      <Primitives />
      <Properties />
    </SimpleSplitter>
  );
}

export default EditorPanel;
