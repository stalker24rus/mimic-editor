import lodash from "lodash";
import { ELEMENT_TYPE_GROUP } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  id: number;
}

const unGroupElements =
  ({ id }: Props) =>
  (object: MimicElementProps) => {
    const [group] = lodash.remove(
      object.children,
      (element: MimicElementProps) =>
        element.attributes.general.id === id &&
        element.type === ELEMENT_TYPE_GROUP
    );

    console.log("group >>> ", group);

    const elements: MimicElementProps[] = [];

    if (group.children.length > 0) {
      for (let i = 0; i < group.children.length; i++) {
        const element = group.children[i];
        const points = element.attributes.position.points.map(function (point) {
          return {
            x: point.x + group.attributes.position.points[0].x,
            y: point.y + group.attributes.position.points[0].y,
          };
        });

        element.attributes.position.points = points;
        element.freezed = false;
        elements.push(element);
      }
      console.log("elements >>> ", elements);
      object.children = [...object.children, ...elements];
    }
  };

export default unGroupElements;
