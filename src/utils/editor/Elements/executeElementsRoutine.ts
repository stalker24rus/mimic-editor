import { IMimicElement } from "../../../models/Editor";

function checkId(searcedId: number | number[], objectId: number) {
  if (Array.isArray(searcedId)) {
    return searcedId.includes(objectId);
  }

  if (Number.isInteger(searcedId)) {
    return searcedId === objectId;
  }

  return false;
}

const executeRoutineById = (
  targetId: number | number[],
  object: IMimicElement,
  routine: Function
) => {
  if (checkId(targetId, object.attributes.general.id)) {
    routine(object);
    return;
  } else {
    for (let i = 0; i < object.children.length; i++) {
      const objectChild = object.children[i];
      executeRoutineById(targetId, objectChild, routine);
    }
    return;
  }
};

export const executeRoutineByName = (
  name: string,
  object: IMimicElement,
  routine: Function
) => {
  if (name === object.attributes.general.name) {
    routine(object);
    return;
  } else {
    for (let i = 0; i < object.children.length; i++) {
      const objectChild = object.children[i];
      executeRoutineByName(name, objectChild, routine);
    }
    return;
  }
};

export default executeRoutineById;
