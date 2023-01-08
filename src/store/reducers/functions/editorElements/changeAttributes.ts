import { IMimicElement } from "../../../../models/Editor";

interface ChangesProp {
  propFamily: string;
  name: string;
  value: string | number;
}

const changeAttribute =
  ({ propFamily, name, value }: ChangesProp) =>
  (object: IMimicElement) => {
    object.attributes[propFamily][name] = value;
  };

export default changeAttribute;
