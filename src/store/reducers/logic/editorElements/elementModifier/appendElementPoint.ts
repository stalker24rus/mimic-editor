import { IPointProp } from ".";
import { IMimicElement } from "../../../../../models/Editor";

const appendElementPoint =
  ({ point }: IPointProp) =>
  (object: IMimicElement) => {
    object.attributes.position.points.push(point);
  };

export default appendElementPoint;
