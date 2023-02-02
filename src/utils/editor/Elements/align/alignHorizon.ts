import { IMimicElement } from "../../../../models/Editor";
import { getBoxFromElements } from "../../getBoxFromElements";

export const alignHorizon =
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

          const baseHorizonCenter =
            (baseElementRect[1] + (baseElementRect[1] + baseElementRect[2])) /
            2;
          const slaveHorizonCenter =
            (slaveRect[1] + (slaveRect[1] + slaveRect[2])) / 2;

          for (let j = 0; j < points.length; j++) {
            if (baseHorizonCenter < slaveHorizonCenter) {
              elements[i].attributes.position.points[j].x =
                points[j].x - (slaveHorizonCenter - baseHorizonCenter);
            }

            if (baseHorizonCenter > slaveHorizonCenter) {
              elements[i].attributes.position.points[j].x =
                points[j].x + (baseHorizonCenter - slaveHorizonCenter);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export default alignHorizon;
