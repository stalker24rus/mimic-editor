import { IMimicElement, IPoint } from "../../models/Editor";
import checkIsPointInArea from "../editor/checkIsPointInArea";
import { getAreaPointsByHWP } from "../editor/getAreaPointsByHWP";
import rotateElementPoints from "../editor/rotateElementPoints";

export default function (elements: IMimicElement[], area: [IPoint, IPoint]) {
  let selected = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { width, height, angle, points } = element.attributes.position;

    let tempPoints = [...points];

    let innerPoints = 0;

    if (width && height !== undefined && points.length === 1) {
      const center = {
        x: tempPoints[0].x + width / 2,
        y: tempPoints[0].y + height / 2,
      };
      tempPoints = rotateElementPoints(
        center,
        getAreaPointsByHWP(width, height, tempPoints[0]),
        angle | 0
      );
    }

    for (let j = 0; j < tempPoints.length; j++) {
      const point = tempPoints[j];

      if (checkIsPointInArea(area, point)) {
        innerPoints++;
      }
    }

    if (innerPoints === tempPoints.length) {
      selected.push(element.attributes.general.id);
    }
  }
  return selected || [];
}
