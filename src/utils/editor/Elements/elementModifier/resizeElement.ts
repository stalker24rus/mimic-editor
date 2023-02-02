import { IResizeElementProp } from ".";
import { IMimicElement } from "../../../../models/Editor";
import resizeBox from "../../resizeBox";

const resizeElement =
  ({ targetName, point }: IResizeElementProp) =>
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
