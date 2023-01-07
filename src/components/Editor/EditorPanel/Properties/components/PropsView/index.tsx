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
        background: "#ffffff",
      }}
    >
      <div style={{ background: "#ffffff", width: "100%" }}>
        <div
          className="bg-gray-200 hover:bg-gray-300 "
          style={{ width: "100%", height: "25px" }}
        >
          <div style={{ marginLeft: "15px" }} onClick={handleClick}>
            {title}
          </div>
        </div>

        {expand && (
          <div style={{ background: "#ffffff", marginLeft: "15px" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
