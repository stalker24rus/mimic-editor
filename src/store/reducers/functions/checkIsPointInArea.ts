import { PointFromat } from "../../../models/Editor";
//               X
// x1, y1  _____________
//        |             |
//        |   []        |
//    Y   |       []    |
//        | []          |
//        |_____________|
//                       x2, y2
//
//
//               X
//        _______________x1, y1
//        |             |
//        |   []        |
//    Y   |       []    |
//        | []          |
//        |_____________|
//   x2, y2
//
//
//               X
// x2, y2 _______________
//        |             |
//        |   []        |
//    Y   |       []    |
//        | []          |
//        |_____________|
//                       x1, y1
//
//
//               X
//        _______________x2, y2
//        |             |
//        |   []        |
//   Y    |       []    |
//        | []          |
//        |_____________|
//   x1, y1

export default (area: [PointFromat, PointFromat], point: PointFromat) => {
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = area;

  if (x1 <= x2 && y1 <= y2) {
    if (x1 <= point.x && point.x <= x2 && y1 <= point.y && point.y <= y2) {
      return true;
    }
  }

  if (x1 >= x2 && y1 <= y2) {
    if (x1 >= point.x && point.x >= x2 && y1 <= point.y && point.y <= y2) {
      return true;
    }
  }

  if (x1 >= x2 && y1 >= y2) {
    if (x1 >= point.x && point.x >= x2 && y1 >= point.y && point.y >= y2) {
      return true;
    }
  }

  if (x1 <= x2 && y1 >= y2) {
    if (x1 <= point.x && point.x <= x2 && y1 >= point.y && point.y >= y2) {
      return true;
    }
  }

  return false;
};
