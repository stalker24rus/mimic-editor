import { IMimicElement, IPoint } from "../../../../models/Editor";

interface Props {
  point: IPoint;
}

const appendElementPoint =
  ({ point }: Props) =>
  (object: IMimicElement) => {
    object.attributes.position.points.push(point);
  };

export default appendElementPoint;
