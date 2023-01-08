import { IMimicElement, IPoint } from "../../../../models/Editor";

interface Props {
  pointNo: number;
  point: IPoint;
}

const changeElementPoint =
  ({ pointNo, point }: Props) =>
  (object: IMimicElement) => {
    object.attributes.position.points[pointNo] = { ...point };
  };

export default changeElementPoint;
