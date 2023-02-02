import { IMimicElement } from "../../../../models/Editor";
import { getBoxFromElements } from "../../getBoxFromElements";

export const alignVertical =
  ({ selected }: IAlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = [...element.attributes.position.points];

          const slaveRect = getBoxFromElements([element]);

          const baseVerticalCenter =
            (baseElementRect[0] + (baseElementRect[0] + baseElementRect[3])) /
            2;
          const slaveVerticalCenter =
            (slaveRect[0] + (slaveRect[0] + slaveRect[3])) / 2;

          for (let j = 0; j < points.length; j++) {
            if (baseVerticalCenter < slaveVerticalCenter) {
              elements[i].attributes.position.points[j].y =
                points[j].y - (slaveVerticalCenter - baseVerticalCenter);
            }

            if (baseVerticalCenter > slaveVerticalCenter) {
              elements[i].attributes.position.points[j].y =
                points[j].y + (baseVerticalCenter - slaveVerticalCenter);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export default alignVertical;
