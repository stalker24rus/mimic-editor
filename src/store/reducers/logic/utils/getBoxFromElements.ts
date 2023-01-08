import { IMimicElement } from "../../../../models/Editor";
import { getAreaPointsByHWP } from "./getAreaPointsByHWP";
import rotateElementPoints from "./rotateElementPoints";

export function getBoxFromElements(elements: IMimicElement[]): IAlignResult {
  let minX: number;
  let maxX: number;
  let minY: number;
  let maxY: number;
  let points = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const {
      width,
      height,
      angle,
      points: oldPoints,
    } = element.attributes.position;

    let tempPoints = [...oldPoints];

    if (width && height !== undefined && oldPoints.length === 1) {
      const center = {
        x: tempPoints[0].x + width / 2,
        y: tempPoints[0].y + height / 2,
      };
      tempPoints = rotateElementPoints(
        center,
        getAreaPointsByHWP(width, height, tempPoints[0]),
        angle | 0
      );
    }

    points = [...points, ...tempPoints];
  }

  for (let j = 0; j < points.length; j++) {
    const point = points[j];

    // First step
    if (j === 0) {
      minX = point.x;
      maxX = point.x;
      minY = point.y;
      maxY = point.y;
    }

    // Update states
    if (point.x < minX) {
      minX = point.x;
    }

    if (point.y < minY) {
      minY = point.y;
    }

    if (point.x > maxX) {
      maxX = point.x;
    }

    if (point.y > maxY) {
      maxY = point.y;
    }
  }

  return [minY, minX, maxX - minX, maxY - minY];
}
