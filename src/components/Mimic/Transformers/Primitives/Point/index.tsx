import BaseDrag from "../BaseDrag";

function Point({
  className,
  cursorType,
  position,
  onDragMove,
  onPointerDown,
  onPointerUp,
  onPointerMove,
}): JSX.Element {
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
    />
  );
}

Point.defaultProps = {
  onDragMove: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default Point;
