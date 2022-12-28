import { PointFromat } from "../../../models/Editor";

export function getAreaPointsByHWP(
  width: number,
  height: number,
  point: PointFromat
): PointFromat[] {
  return [
    point,
    { x: point.x + width, y: point.y },
    { x: point.x, y: point.y + height },
    { x: point.x + width, y: point.y + height },
  ];
}
