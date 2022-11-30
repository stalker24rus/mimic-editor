import {
  BOX_BOTTOM_LEFT,
  BOX_BOTTOM_RIGHT,
  BOX_TOP_LEFT,
  BOX_TOP_RIGHT,
} from "../../../../../constants/literals";
import { MimicElementProps } from "../../../../../models/Editor";

import Point from "../Point";

interface Props {
  component: MimicElementProps;
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

  const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp(ev);
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
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

/*
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const targetName = event.target.className;

    const { left: mainLeft, top: mainTop } = document
      .getElementById(MIMIC_FRAME_ID)
      .getBoundingClientRect();

    const result = resizeBox({
      ...topLeftPoint,
      width,
      height,
      cursorX: cursorX - mainLeft,
      cursorY: cursorY - mainTop,
      angle,
      targetName,
    });

    onSetAttributes({ position: { ...result } });

*/

// const cursorX = e.clientX;
// const cursorY = e.clientY;
// const targetName = e.target.className;
// const res = resizeBox({
//   left,
//   top,
//   width,
//   height,
//   cursorX,
//   cursorY,
//   angle,
//   targetName,
// });
// console.log(res);
