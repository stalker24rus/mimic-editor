import { merge } from "lodash";
import { MimicElementProps, Attributes } from "../../../../models/Editor";

interface Props {
  attributes: Attributes;
}

const updateElement =
  ({ attributes }: Props) =>
  (object: MimicElementProps) => {
    const mergedElement = { ...merge({}, object, { attributes }) };
    object = { ...mergedElement };
  };

export default updateElement;
