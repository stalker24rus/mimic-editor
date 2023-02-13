import { IPoint } from "../../models/Editor";

export default function correctPoint(
  point: IPoint,
  correction: IPoint
): IPoint {
  return {
    x: point.x - correction.x,
    y: point.y - correction.y,
  };
}
