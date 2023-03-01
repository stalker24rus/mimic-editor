export default function Tabs() {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "scroll",
        display: "inline-flex",
      }}
    >
      <div
        style={{
          background: "rgba(59,130,246, 1)",
          stroke: "rgba(59,130,246, 1)",
          color: "rgba(255,255,255, 1)",
          strokeWidth: 1,
          margin: "3px",
        }}
      >
        Test1.onclick{" "}
        <button
          style={{
            background: "red",
          }}
        >
          X
        </button>
      </div>
      <div
        style={{
          background: "rgba(152,155,157, 1)",
          stroke: "rgba(59,130,246, 1)",
          color: "rgba(255,255,255, 1)",
          strokeWidth: 1,
          margin: "3px",
        }}
      >
        Test2.onclick{" "}
        <button
          style={{
            background: "red",
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
