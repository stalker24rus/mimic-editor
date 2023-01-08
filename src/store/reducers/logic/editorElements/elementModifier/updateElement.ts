import { merge } from "lodash";
import { Attributes, IMimicElement } from "../../../../../models/Editor";

interface Props {
  attributes: Attributes;
}

const updateElement =
  ({ attributes }: Props) =>
  (object: IMimicElement) => {
    const mergedElement = { ...merge({}, object, { attributes }) };
    object = { ...mergedElement };
  };

export default updateElement;
