import lodash from "lodash";
import { IMimicElement } from "../../../../../models/Editor";

interface Props {
  id: number;
  elements: IMimicElement[];
}

function changeId(id: number, object: IMimicElement) {
  object.attributes.general.id = id;
  id++;
  for (let i = 0; i < object.children.length; i++) {
    id = changeId(id, object.children[i]);
  }
  return id;
}

const pasteElements =
  ({ elements, id }: Props) =>
  (object: IMimicElement) => {
    let lastId = id;
    let newElements = lodash.cloneDeep(elements);

    for (let i = 0; i < newElements.length; i++) {
      lastId = changeId(lastId, newElements[i]);
    }

    object.children = [...object.children, ...newElements];
  };

export default pasteElements;

// for (let i = 0; i < elements.length; i++) {
//   const element: MimicElementProps = elements[i];
//   element.attributes.general.id = lastId;
//   newElements.push(lodash.cloneDeep(element));
//   lastId++;
// }
