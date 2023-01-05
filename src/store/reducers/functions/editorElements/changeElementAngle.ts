import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  point: PointFromat;
}

const changeElementAngle =
  ({ point }: Props) =>
  (object: MimicElementProps) => {
    const topLeft = object?.attributes.position.points[0];
    const width = object?.attributes.position.width;
    const height = object?.attributes.position.height;

    const boxCenter = {
      x: topLeft.x + width / 2,
      y: topLeft.y + height / 2,
    };

    const angle =
      Math.atan2(point.x - boxCenter.x, -(point.y - boxCenter.y)) *
      (180 / Math.PI);

    object.attributes.position.angle = angle;
  };

export default changeElementAngle;
