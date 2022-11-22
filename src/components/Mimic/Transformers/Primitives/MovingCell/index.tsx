import { useState } from "react";

function MovingCell({
  component,
  onClick,
  onPointerUp,
  onPointerDown,
  onPointerMove,
  onSetAttributes,
}) {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points } = position;

  const [topLeftPoint] = points;

  const [isDragging, setIsDragging] = useState(false);

  const handleOnClick = (e: any) => {
    onClick(e);
  };

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    onPointerDown(e);
  };

  const handlePointerUp = (e: any) => {
    setIsDragging(false);
    onPointerUp(e);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) {
      const attributes = {
        position: {
          points: [
            {
              y: topLeftPoint.y + e.movementY,
              x: topLeftPoint.x + e.movementX,
            },
          ],
        },
      };
      onSetAttributes(attributes);
    }
    onPointerMove(e);
  };

  return (
    <div
      style={{
        userSelect: "none",
        cursor: "move",
        position: "absolute",
        width,
        height,
        top: 0,
        left: 0,
      }}
      onClick={handleOnClick}
      onPointerUp={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    ></div>
  );
}

MovingCell.defaultProps = {
  onClick: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
  onDragMove: () => {},
};

export default MovingCell;
