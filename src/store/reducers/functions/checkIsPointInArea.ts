import { PointFromat } from "../../../models/Editor";

export default (area: [PointFromat, PointFromat], point: PointFromat) => {
  // FIXME NEED TEST
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = area;

  // x1, y1  _____________
  //        |             |
  //        |   []        |
  //        |       []    |
  //        | []          |
  //        |_____________|
  //                       x2, y2
  if (x1 <= x2 && y1 <= y2) {
    if (x1 <= point.x && point.x <= x2 && y1 <= point.y && point.y <= y2) {
      return true;
    }
  }

  //        _______________x1, y1
  //        |             |
  //        |   []        |
  //        |       []    |
  //        | []          |
  //        |_____________|
  //   x2, y2
  if (x1 <= x2 && y1 >= y2) {
    if (x1 <= point.x && point.x <= x2 && y1 >= point.y && point.y >= y2) {
      return true;
    }
  }

  // x2, y2 _______________
  //        |             |
  //        |   []        |
  //        |       []    |
  //        | []          |
  //        |_____________|
  //                       x1, y1
  if (x1 >= x2 && y1 >= y2) {
    if (x1 >= point.x && point.x <= x2 && y1 >= point.y && point.y >= y2) {
      return true;
    }
  }

  //        _______________x2, y2
  //        |             |
  //        |   []        |
  //        |       []    |
  //        | []          |
  //        |_____________|
  //   x1, y1
  if (x1 >= x2 && y1 <= y2) {
    if (x1 <= point.x && point.x <= x2 && y1 >= point.y && point.y >= y2) {
      return true;
    }
  }

  return false;
};
