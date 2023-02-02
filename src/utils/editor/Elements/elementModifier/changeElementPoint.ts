import { IChangeElementPoint } from ".";
import { IMimicElement } from "../../../../models/Editor";

const changeElementPoint =
  ({ pointNo, point }: IChangeElementPoint) =>
  (object: IMimicElement) => {
    object.attributes.position.points[pointNo] = { ...point };
  };

export default changeElementPoint;
