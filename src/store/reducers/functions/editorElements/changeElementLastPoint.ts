import { IMimicElement, IPoint } from "../../../../models/Editor";

interface Props {
  point: IPoint;
}

const selectElementPointsLength = (element: IMimicElement) =>
  element.attributes.position.points.length;

const changeElementLastPoint =
  ({ point }: Props) =>
  (object: IMimicElement) => {
    const pointsLength = selectElementPointsLength(object);

    if (pointsLength > 0) {
      object.attributes.position.points[pointsLength - 1] = { ...point };
    } else {
      object.attributes.position.points.push({ ...point });
    }
  };

export default changeElementLastPoint;
