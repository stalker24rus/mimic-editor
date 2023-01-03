import { MimicElementProps } from "../../../models/Editor";

interface ChangesProp {
  propFamily: string;
  name: string;
  value: string | number;
}
/**
 * Attention mutate object
 * @param id
 * @param object
 * @param changesProp
 * @returns
 */
const changeAttribute = (
  id: number,
  object: MimicElementProps,
  changesProp: ChangesProp
) => {
  if (object.attributes.general.id === id) {
    const { propFamily, name, value } = changesProp;
    object.attributes[propFamily][name] = value;
    return;
  } else {
    for (let i = 0; i < object.children.length; i++) {
      const objectChild = object.children[i];
      changeAttribute(id, objectChild, changesProp);
    }
  }
  return;
};

export default changeAttribute;
