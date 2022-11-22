import { useState } from "react";

function BaseDrag({
  className,
  styleComponent,
  onDragMove,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  children,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) onDragMove(e);
    onPointerMove(e);
  };

  return (
    <div
      className={className}
      style={styleComponent}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}

BaseDrag.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default BaseDrag;
