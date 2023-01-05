import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  movement: PointFromat;
}

const moveElementPoints =
  ({ movement }: Props) =>
  (object: MimicElementProps) => {
    const newPoints = object.attributes.position.points.map(function (element) {
      return {
        x: element.x + movement.x,
        y: element.y + movement.y,
      };
    });
    object.attributes.position.points = [...newPoints];
  };

export default moveElementPoints;
