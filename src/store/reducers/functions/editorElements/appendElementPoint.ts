import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  point: PointFromat;
}

const appendElementPoint =
  ({ point }: Props) =>
  (object: MimicElementProps) => {
    object.attributes.position.points.push(point);
  };

export default appendElementPoint;
