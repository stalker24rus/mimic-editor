import { IChangeAttributeProp } from ".";
import { IMimicElement } from "../../../../../models/Editor";

const changeElementAttribute =
  ({ propFamily, name, value }: IChangeAttributeProp) =>
  (object: IMimicElement) => {
    object.attributes[propFamily][name] = value;
  };

export default changeElementAttribute;
