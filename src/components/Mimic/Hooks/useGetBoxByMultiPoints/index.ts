import { PointFromat } from "../../../../models/Editor";

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

export default useGetBoxByMultiPoints;
