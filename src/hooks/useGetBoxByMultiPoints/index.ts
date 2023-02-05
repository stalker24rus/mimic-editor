import { IMimicElement, IPoint } from "../../models/Editor";
import { getAreaPointsByHWP } from "../../utils/editor/getAreaPointsByHWP";
import rotateElementPoints from "../../utils/editor/rotateElementPoints";

type FuncResult = [top: number, left: number, width: number, height: number];

function useGetBoxByMultiPoints(): [Function] {
  /**
   * The function calculates the bounds of a rectangle by internal points
   * @param points
   */
  function func(points: IPoint[]): FuncResult {
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;

    // Get the min and max for the x and y.
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      // First step
      if (i === 0) {
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

    const result: FuncResult = [minY, minX, maxX - minX, maxY - minY];

    return result;
  }

  return [func];
}

export function useGetBoxFromElements(): [Function] {
  //TODO it remove
  function func(elements: IMimicElement[]): FuncResult {
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
      // points.push(...element.attributes.position.points);
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

    const result: FuncResult = [minY, minX, maxX - minX, maxY - minY];

    return result;
  }

  return [func];
}

export default useGetBoxByMultiPoints;
