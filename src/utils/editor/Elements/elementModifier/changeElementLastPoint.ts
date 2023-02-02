import { IPointProp } from ".";
import { IMimicElement } from "../../../../models/Editor";

const selectElementPointsLength = (element: IMimicElement) =>
  element.attributes.position.points.length;

const changeElementLastPoint =
  ({ point }: IPointProp) =>
  (object: IMimicElement) => {
    const pointsLength = selectElementPointsLength(object);

    if (pointsLength > 0) {
      object.attributes.position.points[pointsLength - 1] = { ...point };
    } else {
      object.attributes.position.points.push({ ...point });
    }
  };

export default changeElementLastPoint;
