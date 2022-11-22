import BaseDrag from "../BaseDrag";

function Point({
  className,
  cursorType,
  position,
  onDragMove,
  onPointerDown,
  onPointerUp,
  onPointerMove,
}) {
  const baseStyle = {
    position: "absolute",
    width: 10,
    height: 10,
    background: "white",
    borderRadius: "50%",
    opacity: 0.5,
    pointerEvents: "auto",
  };

  return (
    <BaseDrag
      className={className}
      styleComponent={{
        ...baseStyle,
        cursor: cursorType,
        ...position,
      }}
      onDragMove={onDragMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      {/* <div
        style={{
          position: "absolute",
          width: 5,
          height: 5,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "black",
          opacity: 0.25,
        }}
      ></div> */}
    </BaseDrag>
  );
}

export default Point;
