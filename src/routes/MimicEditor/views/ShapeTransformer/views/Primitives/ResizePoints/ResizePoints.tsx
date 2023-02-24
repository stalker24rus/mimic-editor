import { useState } from "react";
import {
  BOX_BOTTOM_LEFT,
  BOX_BOTTOM_RIGHT,
  BOX_TOP_LEFT,
  BOX_TOP_RIGHT,
} from "../../../../../../../constants/literals";
import { IMimicElement } from "../../../../../../../models/Editor";

import Point from "../Point";

interface Props {
  component: IMimicElement;
  onPointerDown: Function;
  onPointerUp: Function;
  onPointerMove: Function;
  onDragMove: Function;
}

function ResizePoints({
  component,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onDragMove,
}: Props): JSX.Element {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points, angle } = position;

  const [isDragging, setIsDragging] = useState(false);

  //FIXME
  const handlePointerDown = (ev: any) => {
    setIsDragging(true);
    const { target, pointerId } = ev;
    target.setPointerCapture(pointerId);
    onPointerDown(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onPointerUp(ev);
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    onPointerMove(ev);
  };

  const handelDragMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    onDragMove(ev);
  };

  const funcProps = {
    onDragMove: handelDragMove,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerMove: handlePointerMove,
  };

  return (
    <>
      <Point
        className={BOX_TOP_LEFT}
        cursorType={"pointer"}
        position={{
          top: -5,
          left: -5,
        }}
        {...funcProps}
      />

      <Point
        className={BOX_TOP_RIGHT}
        cursorType={"pointer"}
        position={{
          top: -5,
          right: -5,
        }}
        {...funcProps}
      />

      <Point
        className={BOX_BOTTOM_LEFT}
        cursorType={"pointer"}
        position={{
          bottom: -5,
          left: -5,
        }}
        {...funcProps}
      />

      <Point
        className={BOX_BOTTOM_RIGHT}
        cursorType={"pointer"}
        position={{
          bottom: -5,
          right: -5,
        }}
        {...funcProps}
      />
    </>
  );
}

ResizePoints.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
  onDragMove: () => {},
};

export default ResizePoints;
