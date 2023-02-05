import Primitives from "./views/Primitives";
import SimpleSplitter from "../../../../ui/SimpleSplitter";
import Properties from "./views/Properties";
import TabsPanel, { TabProps } from "../../../../ui/TabsPanel";
import ElementsTree from "./views/ElementsTree";
import ExpressPanel from "./views/ExpressPanel";

/**
 * The EditorPanel is a component for Editor module.
 * It provides functionality for changing Editor states.
 *
 * @returns {JSX.Element}
 */
export default function InstrumentPanel(): JSX.Element {
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
