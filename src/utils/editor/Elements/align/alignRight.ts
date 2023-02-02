import { IMimicElement } from "../../../../models/Editor";
import { getBoxFromElements } from "../../getBoxFromElements";

const alignRight =
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
            if (
              baseElementRect[1] + baseElementRect[2] <
              slaveRect[1] + slaveRect[2]
            ) {
              elements[i].attributes.position.points[j].x =
                points[j].x -
                (slaveRect[1] +
                  slaveRect[2] -
                  (baseElementRect[1] + baseElementRect[2]));
            }

            if (
              baseElementRect[1] + baseElementRect[2] >
              slaveRect[1] + slaveRect[2]
            ) {
              elements[i].attributes.position.points[j].x =
                points[j].x +
                (baseElementRect[1] +
                  baseElementRect[2] -
                  (slaveRect[1] + slaveRect[2]));
            }
          }
        }
      }
      object.children = elements;
    }
  };

export default alignRight;
