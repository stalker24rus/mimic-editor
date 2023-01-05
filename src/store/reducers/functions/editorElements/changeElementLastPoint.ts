import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  point: PointFromat;
}

const selectElementPointsLength = (element: MimicElementProps) =>
  element.attributes.position.points.length;

const changeElementLastPoint =
  ({ point }: Props) =>
  (object: MimicElementProps) => {
    const pointsLength = selectElementPointsLength(object);

    if (pointsLength > 0) {
      object.attributes.position.points[pointsLength - 1] = { ...point };
    } else {
      object.attributes.position.points.push({ ...point });
    }
  };

export default changeElementLastPoint;
