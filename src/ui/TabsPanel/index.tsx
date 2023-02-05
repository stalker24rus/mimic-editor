import { useCallback, useEffect, useRef, useState } from "react";

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
  const [heightCur, setHeightCur] = useState(null);
  const view = useRef<HTMLDivElement>(null);
  const footerHeight = 45;

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const newWrapperState = view?.current?.getBoundingClientRect();
      setHeightCur(newWrapperState.height ?? 0);
    });
    resizeObserver.observe(view.current!);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={view} style={{ width, height, position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: `${heightCur - footerHeight}px`,
          overflow: "scroll",
        }}
      >
        {elements.length > 0 && <>{elements[activeTab].element}</>}
      </div>

      <div
        className="flex flex-inline"
        style={{
          borderTop: "1px solid",

          bottom: 0,
          left: 0,
          width: "100%",
          height: `${footerHeight}px`,
          position: "absolute",
          background: "white",
          overflowX: "scroll",
        }}
      >
        {elements.map((element, index) => {
          return (
            <div
              className={`text-black ${
                index === activeTab ? "bg-gray-200" : ""
              } hover:bg-gray-200 m-1 rounded py-1 px-3`}
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
