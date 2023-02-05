import Primitives from "./Primitives";
import SimpleSplitter from "../../../ui/SimpleSplitter";
import Properties from "./Properties";
import TabsPanel, { TabProps } from "../../../ui/TabsPanel";
import ElementsTree from "./ElementsTree";
import ExpressPanel from "./ExpressPanel";

/**
 * The EditorPanel is a component for Editor module.
 * It provides functionality for changing Editor states.
 *
 * @returns {JSX.Element}
 */
function EditorPanel(): JSX.Element {
  const tabs: TabProps[] = [
    {
      name: "Примитивы",
      element: <Primitives />,
    },
    {
      name: "Элементы",
      element: <ElementsTree />,
    },
  ];
  return (
    <>
      <ExpressPanel />
      <SimpleSplitter orientation="horizontal" defaultRatio={25}>
        <TabsPanel width={"100%"} height={"100%"} elements={tabs} />

        <Properties />
      </SimpleSplitter>
    </>
  );
}

export default EditorPanel;
