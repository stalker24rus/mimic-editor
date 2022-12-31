import { useState } from "react";

export interface TabProps {
  name: string;
  element: JSX.Element;
}

export interface Props {
  width: number | string;
  height: number | string;
  elements: TabProps[];
  tabStyle?: { [key: string]: string | number };
}

function TabsPanel({ elements, width, height }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width, height, position: "relative" }}>
      {elements.length > 0 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}
        >
          {elements[activeTab].element}
        </div>
      )}
      <div
        className="flex flex-inline"
        style={{
          bottom: 0,
          left: 0,
          width: "100%",
          position: "absolute",
          background: "white",
          overflowX: "scroll",
        }}
      >
        {elements.map((element, index) => {
          return (
            <div
              className="bg-gray-500 hover:bg-gray-700 m-1 rounded py-1 px-3 text-white "
              style={{
                cursor: "pointer",
              }}
              key={index}
              onClick={() => setActiveTab(index)}
            >
              {element.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TabsPanel;
