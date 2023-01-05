import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  pointNo: number;
  point: PointFromat;
}

const changeElementPoint =
  ({ pointNo, point }: Props) =>
  (object: MimicElementProps) => {
    object.attributes.position.points[pointNo] = { ...point };
  };

export default changeElementPoint;
