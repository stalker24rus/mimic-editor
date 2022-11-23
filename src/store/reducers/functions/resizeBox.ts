import {
  BOX_TOP_LEFT,
  BOX_TOP_RIGHT,
  BOX_BOTTOM_LEFT,
  BOX_BOTTOM_RIGHT,
  BOX_TOP_SIDE,
  BOX_BOTTOM_SIDE,
  BOX_LEFT_SIDE,
  BOX_RIGHT_SIDE,
} from "../../../constants/literals";
import rotate from "./rotate";

export default function resizeBox({
  x,
  y,
  width,
  height,
  angle,
  cursorX,
  cursorY,
  targetName,
}) {
  // Вычисляем центр коробки
  const center = { x: x + width / 2, y: y + height / 2 };

  let newX = x;
  let newY = y;
  let newWidth = width;
  let newHeight = height;

  switch (targetName) {
    case BOX_TOP_LEFT: {
      const rotatedD = rotate(x + width, y + height, center.x, center.y, angle);

      const newCenter = {
        x: (cursorX + rotatedD.x) / 2,
        y: (cursorY + rotatedD.y) / 2,
      };

      const newRotatedD = rotate(
        rotatedD.x,
        rotatedD.y,
        newCenter.x,
        newCenter.y,
        -angle
      );

      const rotatedA = rotate(
        cursorX,
        cursorY,
        newCenter.x,
        newCenter.y,
        -angle
      );

      newX = rotatedA.x;
      newY = rotatedA.y;
      newWidth = newRotatedD.x - rotatedA.x;
      newHeight = newRotatedD.y - rotatedA.y;

      break;
    }

    case BOX_TOP_RIGHT: {
      const rotatedC = rotate(x, y + height, center.x, center.y, angle);

      const newCenter = {
        x: (rotatedC.x + cursorX) / 2,
        y: (rotatedC.y + cursorY) / 2,
      };

      const newRotatedC = rotate(
        rotatedC.x,
        rotatedC.y,
        newCenter.x,
        newCenter.y,
        -angle
      );

      const rotatedB = rotate(
        cursorX,
        cursorY,
        newCenter.x,
        newCenter.y,
        -angle
      );

      newX = rotatedB.x - (rotatedB.x - newRotatedC.x);
      newY = rotatedB.y;
      newWidth = rotatedB.x - newRotatedC.x;
      newHeight = newRotatedC.y - rotatedB.y;

      break;
    }

    case BOX_BOTTOM_LEFT: {
      const rotatedB = rotate(x + width, y, center.x, center.y, angle);

      const newCenter = {
        x: (cursorX + rotatedB.x) / 2,
        y: (cursorY + rotatedB.y) / 2,
      };

      const newRotatedB = rotate(
        rotatedB.x,
        rotatedB.y,
        newCenter.x,
        newCenter.y,
        -angle
      );

      const rotatedC = rotate(
        cursorX,
        cursorY,
        newCenter.x,
        newCenter.y,
        -angle
      );

      newX = rotatedC.x;
      newY = newRotatedB.y;
      newWidth = newRotatedB.x - rotatedC.x;
      newHeight = rotatedC.y - newRotatedB.y;
      break;
    }

    case BOX_BOTTOM_RIGHT: {
      const rotatedA = rotate(x, y, center.x, center.y, angle);

      const newCenter = {
        x: (rotatedA.x + cursorX) / 2,
        y: (rotatedA.y + cursorY) / 2,
      };

      // А'
      const newRotatedA = rotate(
        rotatedA.x,
        rotatedA.y,
        newCenter.x,
        newCenter.y,
        -angle
      );

      // D'
      const rotatedD = rotate(
        cursorX,
        cursorY,
        newCenter.x,
        newCenter.y,
        -angle
      );

      newX = newRotatedA.x;
      newY = newRotatedA.y;
      newWidth = rotatedD.x - newRotatedA.x;
      newHeight = rotatedD.y - newRotatedA.y;

      break;
    }

    // FUTURE
    case BOX_TOP_SIDE: {
      break;
    }
    case BOX_BOTTOM_SIDE: {
      break;
    }
    case BOX_LEFT_SIDE: {
      break;
    }
    case BOX_RIGHT_SIDE: {
      break;
    }
  }

  const points = [{ x: newX, y: newY }];

  return { points, width: newWidth, height: newHeight };
}
