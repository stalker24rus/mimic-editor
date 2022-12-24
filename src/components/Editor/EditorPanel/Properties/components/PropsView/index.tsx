import { useState } from "react";

export default function PropsView({ title, children }) {
  const [expand, setExpand] = useState<boolean>(true);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        background: "#ACACAC",
      }}
    >
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#ACACAC", width: "40px", height: "100%" }}
      >
        <button
          className="w-5 h-5 hover:bg-gray-200 flex items-center rounded-xl font-bold p-1 text-center"
          onClick={handleClick}
        >
          {expand ? "-" : "+"}
        </button>
      </div>

      <div style={{ background: "#ffffff", width: "100%" }}>
        <div style={{ background: "#ACACAC", width: "100%" }}>
          <>{title}</>
        </div>

        <div style={{ background: "#ffffff" }}>{expand && <>{children}</>}</div>
      </div>
    </div>
  );
}
