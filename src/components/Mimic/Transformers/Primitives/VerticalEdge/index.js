import BaseDrag from "../BaseDrag";

function VerticalEdge({
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
    height: "100%",
    background: "white",
    opacity: 0.5,
    //borderTop: "solid 2px white",
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

export default VerticalEdge;
