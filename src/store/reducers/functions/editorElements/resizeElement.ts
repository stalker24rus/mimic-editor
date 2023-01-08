import { IMimicElement, IPoint } from "../../../../models/Editor";
import resizeBox from "../resizeBox";

interface Props {
  targetName: string;
  point: IPoint;
}

const resizeElement =
  ({ targetName, point }: Props) =>
  (object: IMimicElement) => {
    const { points, width, height, angle } = object.attributes.position;
    const { x, y } = points[0];

    const newPosition = resizeBox({
      x,
      y,
      width,
      height,
      cursorX: point.x,
      cursorY: point.y,
      angle,
      targetName,
    });

    object.attributes.position = {
      ...object.attributes.position,
      ...newPosition,
    };
  };

export default resizeElement;
