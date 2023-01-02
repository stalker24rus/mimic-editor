import { useEffect, useState } from "react";
import { MimicElementProps } from "../../../../../models/Editor";

interface Props {
  component: MimicElementProps;
  onPointerDown: Function;
  onPointerUp: Function;
  onPointerMove: Function;
}

function MovingCell({
  component,
  onPointerDown,
  onPointerUp,
  onPointerMove,
}: Props): JSX.Element {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points } = position;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (ev: any) => {
    ev.preventDefault();
    setIsDragging(true);
    const { target, pointerId } = ev;
    target.setPointerCapture(pointerId);
    onPointerDown(ev);
  };

  const handlePointerUp = (ev: any) => {
    ev.preventDefault();
    onPointerUp(ev);
    setIsDragging(false);
  };

  const handlePointerMove = (ev: any) => {
    ev.preventDefault();
    if (isDragging) onPointerMove(ev);
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
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    ></div>
  );
}

MovingCell.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
  onDragMove: () => {},
};

export default MovingCell;
