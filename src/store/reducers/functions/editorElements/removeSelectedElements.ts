import lodash from "lodash";
import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  selected: number[];
}

const removeSelectedElements =
  ({ selected }: Props) =>
  (object: MimicElementProps) => {
    lodash.remove(object.children, (element: MimicElementProps) =>
      selected.includes(element.attributes.general.id)
    );
  };

export default removeSelectedElements;
