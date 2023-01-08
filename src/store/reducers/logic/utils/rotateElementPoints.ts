import { IPoint } from "../../../../models/Editor";
import rotate from "./rotate";

export default function rotateElementPoints(
  center: IPoint,
  points: IPoint[],
  angle: number
) {
  let rotatedPoints = [];
  try {
    if (angle === 0) {
      rotatedPoints = [...points];
    } else {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        rotatedPoints.push(rotate(point.x, point.y, center.x, center.y, angle));
      }
    }
    return rotatedPoints;
  } catch (error) {
    return points;
  }
}
