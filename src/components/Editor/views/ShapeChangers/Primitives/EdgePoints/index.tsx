import Point from "../Point";

const topSide = "top-side";
const bottomSide = "bottom-side";
const leftSide = "left-side";
const rightSide = "right-side";

function EdgePoint({ top, left, width, height, onDragMove }) {
  const handelDragMove = (e) => {
    const getPosition = () => {
      switch (e.target.className) {
        case topSide: {
          return {
            top: top + e.movementY,
            left: left,
            width: width,
            height: height + e.movementY * -1,
          };
        }

        case bottomSide: {
          return {
            top: top,
            left: left,
            width: width,
            height: height + e.movementY,
          };
        }

        case leftSide: {
          return {
            top: top,
            left: left + e.movementX,
            width: width + e.movementX * -1,
            height: height,
          };
        }

        case rightSide: {
          return {
            top: top,
            left: left,
            width: width + e.movementX,
            height: height,
          };
        }

        default:
          return {
            top: top,
            left: left,
            width: width,
            height: height,
          };
      }
    };

    onDragMove(getPosition());
  };

  return (
    <>
      {/* <Point
        className={leftSide}
        cursorType={"pointer"}
        position={{
          left: -7.5,
          top: "50%",
          transform: "translate(0%, -50%)",
        }}
        onDragMove={handelDragMove}
      />

      <Point
        className={rightSide}
        cursorType={"pointer"}
        position={{
          right: -7.5,
          top: "50%",
          transform: "translate(0%, -50%)",
        }}
        onDragMove={handelDragMove}
      />

      <Point
        className={topSide}
        cursorType={"pointer"}
        position={{
          top: -7.5,
          marginLeft: "50%",
          transform: "translate(-50%, 0%)",
        }}
        onDragMove={handelDragMove}
      />

      <Point
        className={bottomSide}
        cursorType={"pointer"}
        position={{
          bottom: -7.5,
          marginLeft: "50%",
          transform: "translate(-50%, 0%)",
        }}
        onDragMove={handelDragMove}
      /> */}
    </>
  );
}

export default EdgePoint;
