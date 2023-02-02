import { IMimicElement } from "../../../../models/Editor";
import { getBoxFromElements } from "../../getBoxFromElements";

const alignTop =
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
          const points = element.attributes.position.points;

          const slaveRect = getBoxFromElements([element]);

          for (let j = 0; j < points.length; j++) {
            if (baseElementRect[0] < slaveRect[0]) {
              elements[i].attributes.position.points[j].y =
                points[j].y - (slaveRect[0] - baseElementRect[0]);
            }

            if (baseElementRect[0] > slaveRect[0]) {
              elements[i].attributes.position.points[j].y =
                points[j].y + (baseElementRect[0] - slaveRect[0]);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export default alignTop;
