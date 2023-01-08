import { IMimicElement, IPoint } from "../../../../models/Editor";

interface Props {
  movement: IPoint;
}

const moveElementPoints =
  ({ movement }: Props) =>
  (object: IMimicElement) => {
    const newPoints = object.attributes.position.points.map(function (element) {
      return {
        x: element.x + movement.x,
        y: element.y + movement.y,
      };
    });
    object.attributes.position.points = [...newPoints];
  };

export default moveElementPoints;
