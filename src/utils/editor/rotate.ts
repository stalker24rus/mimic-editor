import { IPoint } from "../../models/Editor";

function rotate(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  angle: number
): IPoint {
  const theta = (Math.PI * 2 * angle) / 360;
  const xt = x - centerX;
  const yt = y - centerY;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  return {
    x: xt * cosTheta - yt * sinTheta + centerX,
    y: xt * sinTheta + yt * cosTheta + centerY,
  };
}

export default rotate;
