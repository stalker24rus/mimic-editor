import { MimicElementProps } from "../../../../models/Editor";

function checkId(searcedId: number | number[], objectId: number) {
  if (Array.isArray(searcedId)) {
    return searcedId.includes(objectId);
  }

  if (Number.isInteger(searcedId)) {
    return searcedId === objectId;
  }

  return false;
}

const mutateElement = (
  searchedId: number | number[],
  object: MimicElementProps,
  func: Function // Mutable
) => {
  if (checkId(searchedId, object.attributes.general.id)) {
    // object.attributes.general.id === searchedId
    func(object);
    return;
  } else {
    for (let i = 0; i < object.children.length; i++) {
      const objectChild = object.children[i];
      mutateElement(searchedId, objectChild, func);
    }
    return;
  }
};

export default mutateElement;
