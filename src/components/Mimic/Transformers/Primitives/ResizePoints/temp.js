import Point from "../Point";

const topLeft = "top-left";
const topRight = "top-right";
const bottomLeft = "bottom-left";
const bottomRight = "bottom-right";

function AnglePoints({ top, left, width, height, angle, onDragMove }) {
  function calcCoordinate(
    x,
    y,
    width,
    height,
    cursorX,
    cursorY,
    angle,
    handler
  ) {
    function rotate(x, y, cx, cy, angle) {
      const angleRad = (angle * Math.PI) / 180;
      const xt = x - cx;
      const yt = y - cy;
      const sinAngle = Math.sin(angleRad);
      const cosAngle = Math.cos(angleRad);

      return [
        xt * cosAngle - yt * sinAngle + cx,
        xt * sinAngle + yt * cosAngle + cy,
      ];
    }

    // Вычисляем центр ??? ширина высота в повернутом состоянии ???
    const center = { x: x + width / 2, y: y + height / 2 };

    // Получаем координаты точки A'
    const rotatedA = rotate(x, y, center.x, center.y, angle);

    // Вычисляем новый центр
    const newCenter = [
      (rotatedA[0] + cursorX) / 2,
      (rotatedA[1] + cursorY) / 2,
    ];

    // Вычисляем координаты после ротации
    // А
    const realTopLeft = rotate(
      rotatedA[0],
      rotatedA[1],
      newCenter[0],
      newCenter[1],
      -angle
    );

    // С
    const positionB = rotate(
      cursorX,
      cursorY,
      newCenter[0],
      newCenter[1],
      -angle
    );

    let newLeft = x;
    let newTop = y;
    let newWidth = width;
    let newHeight = height;

    switch (handler) {
      case topLeft: {
        break;
      }

      case topRight: {
        break;
      }

      case bottomLeft: {
        newLeft = positionB[0];
        newTop = realTopLeft[1];
        newWidth = positionB[0] - realTopLeft[0];
        newHeight = positionB[1] - realTopLeft[1];
        break;
      }

      case bottomRight: {
        newLeft = realTopLeft[0];
        newTop = realTopLeft[1];
        newWidth = positionB[0] - realTopLeft[0];
        newHeight = positionB[1] - realTopLeft[1];
        break;
      }
    }

    return { top: newTop, left: newLeft, width: newWidth, height: newHeight };
  }

  const handelDragMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const handler = e.target.className;

    const newParam = calcCoordinate(
      left,
      top,
      width,
      height,
      x,
      y,
      angle,
      handler
    );
    onDragMove(newParam);
  };

  const handlePointerDown = (e) => {
    // const x = e.clientX;
    // const y = e.clientY;
  };

  const handlePointerUp = (e) => {};

  const funcProps = {
    onDragMove: handelDragMove,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  };

  return (
    <>
      <Point
        className={topLeft}
        cursorType={"pointer"}
        position={{
          top: -7.5,
          left: -7.5,
        }}
        {...funcProps}
      />

      <Point
        className={topRight}
        cursorType={"pointer"}
        position={{
          top: -7.5,
          right: -7.5,
        }}
        {...funcProps}
      />

      <Point
        className={bottomLeft}
        cursorType={"pointer"}
        position={{
          bottom: -7.5,
          left: -7.5,
        }}
        {...funcProps}
      />

      <Point
        className={bottomRight}
        cursorType={"pointer"}
        position={{
          bottom: -7.5,
          right: -7.5,
        }}
        {...funcProps}
      />

      <Point
        className={bottomRight}
        cursorType={"pointer"}
        position={{
          left: width / 2 - 7.5,
          top: height / 2 - 7.5,
        }}
      />
    </>
  );
}

export default AnglePoints;

//const handelDragMove = (e) => {
//const getPosition = () => {
// var len=Math.sqrt(Math.pow(a2x-a1x,2)+Math.pow(a2y-a1y,2));
//line from a2 to H
//var hDif=Math.sin(R)*len;
//line from a1 to H
//var wDif=Math.cos(R)*len;

//   switch (e.target.className) {
//     case topLeft: {
//       return {
//         top: top + e.movementY,
//         left: left + e.movementX,
//         width: width + e.movementX * -1,
//         height: height + e.movementY * -1,
//       };
//     }

//     case topRight: {
//       return {
//         top: top + e.movementY,
//         left: left,
//         width: width + e.movementX,
//         height: height + e.movementY * -1,
//       };
//     }

//     case bottomLeft: {
//       return {
//         top: top,
//         left: left + e.movementX,
//         width: width + e.movementX * -1,
//         height: height + e.movementY,
//       };
//     }

//     case bottomRight: {
//       return {
//         top: top,
//         left: left,
//         width: width + e.movementX,
//         height: height + e.movementY,
//       };
//     }

//     default:
//       return {
//         top: top,
//         left: left,
//         width: width,
//         height: height,
//       };
//   }
// };

//calcCoordinate(top, left, width, height, e.screenX, e.screenY, angle);
//console.log(e);

// const cx = left + width / 2;
// const cy = top + height / 2;

// function rotate(x, y, cx, cy, angle) {
//   return [
//     (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
//     (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
//   ];
// }
// const rotatedA = rotate(left, top, cx, cy, angle);
// const rotatedD = rotate(left + width, top + height, cx, cy, angle);

// const newCenter = [
//   (rotatedA[0] + bottomRightX) / 2, // rotatedD[0]) / 2,
//   (rotatedA[1] + bottomRightY) / 2, //rotatedD[1]) / 2,
// ];

// const newTopLeft = rotate(
//   rotatedA[0],
//   rotatedA[1],
//   newCenter[0],
//   newCenter[1],
//   -angle
// );

// const newBottomRight = rotate(
//   rotatedD[0],
//   rotatedD[1],
//   newCenter[0],
//   newCenter[1],
//   -angle
// );

// const newTop = newTopLeft[0];
// const newLeft = newTopLeft[1];
// const newWidth = newBottomRight[0] - newTopLeft[0];
// const newHeight = newBottomRight[1] - newTopLeft[1];
