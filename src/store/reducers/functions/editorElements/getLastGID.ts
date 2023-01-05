import { MimicElementProps } from "../../../../models/Editor";

export default function getLastGID(
  id: number,
  object: MimicElementProps
): number {
  let tempId = id;

  if (object.attributes.general.id > tempId) {
    tempId = object.attributes.general.id;
  }

  for (let i = 0; i < object.children.length; i++) {
    const element = object.children[i];
    const result = getLastGID(tempId, element);
    if (result > tempId) {
      tempId = result;
    }
  }

  return tempId;
}
