export default function rotate(x, y, centerX, centerY, angle) {
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
