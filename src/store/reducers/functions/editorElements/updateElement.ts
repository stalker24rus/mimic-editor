import { merge } from "lodash";
import { IMimicElement, Attributes } from "../../../../models/Editor";

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
