import BaseDrag from "../BaseDrag";

function HorizonEdge({
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
    width: "100%",
    height: 10,
    background: "white",
    opacity: 0.5,
    //borderLeft: "solid 2px white",
  };

  return (
    <BaseDrag
      className={className}
      styleComponent={{
        cursor: cursorType,
        ...position,
        ...baseStyle,
      }}
      onDragMove={onDragMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    />
  );
}

export default HorizonEdge;
