import useResizeBox, {
  bottomLeft,
  bottomRight,
  bottomSide,
  leftSide,
  rightSide,
  topLeft,
  topRight,
  topSide,
} from "../../Hooks/useResize";
import { MIMIC_FRAME_ID } from "../../MimicCanvas/Canvas";
import Point from "../Point";

function ResizePoints({
  component,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onSetAttributes,
}) {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points, angle } = position;

  const [topLeftPoint] = points;

  const resizeBox = useResizeBox();

  const handelDragMove = (event) => {
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
  };

  const handlePointerDown = (e) => {
    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    onPointerMove(e);
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
        className={topLeft}
        cursorType={"pointer"}
        position={{
          top: -5,
          left: -5,
        }}
        {...funcProps}
      />

      <Point
        className={topRight}
        cursorType={"pointer"}
        position={{
          top: -5,
          right: -5,
        }}
        {...funcProps}
      />

      <Point
        className={bottomLeft}
        cursorType={"pointer"}
        position={{
          bottom: -5,
          left: -5,
        }}
        {...funcProps}
      />

      <Point
        className={bottomRight}
        cursorType={"pointer"}
        position={{
          bottom: -5,
          right: -5,
        }}
        {...funcProps}
      />

      {/* FUTURE */}

      {/* <Point
        className={leftSide}
        cursorType={"pointer"}
        position={{
          left: -5,
          top: "50%",
          transform: "translate(0%, -50%)",
        }}
        {...funcProps}
      />

      <Point
        className={rightSide}
        cursorType={"pointer"}
        position={{
          right: -5,
          top: "50%",
          transform: "translate(0%, -50%)",
        }}
        {...funcProps}
      />

      <Point
        className={topSide}
        cursorType={"pointer"}
        position={{
          top: -5,
          marginLeft: "50%",
          transform: "translate(-50%, 0%)",
        }}
        {...funcProps}
      />

      <Point
        className={bottomSide}
        cursorType={"pointer"}
        position={{
          bottom: -5,
          marginLeft: "50%",
          transform: "translate(-50%, 0%)",
        }}
        {...funcProps}
      /> */}
    </>
  );
}

ResizePoints.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default ResizePoints;

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
