import lodash from "lodash";
import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  id: number;
  elements: MimicElementProps[];
}

const pasteElements =
  ({ elements, id }: Props) =>
  (object: MimicElementProps) => {
    let lastId = id;
    let newElements: MimicElementProps[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element: MimicElementProps = elements[i];
      element.attributes.general.id = lastId;
      newElements.push(lodash.cloneDeep(element));
      lastId++;
    }
    object.children = [...object.children, ...newElements];
  };

export default pasteElements;
