import { MimicElementProps, PointFromat } from "../../../../models/Editor";

type FuncResult = [top: number, left: number, width: number, height: number];

function useGetBoxByMultiPoints(): [Function] {
  /**
   * The function calculates the bounds of a rectangle by internal points
   * @param points
   */
  function func(points: PointFromat[]): FuncResult {
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
  function func(elements: MimicElementProps[]): FuncResult {
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;
    let points = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      points.push(...element.attributes.position.points);
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
