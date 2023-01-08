import lodash from "lodash";
import { IMimicElement } from "../../../../../models/Editor";

interface Props {
  selected: number[];
}

const removeSelectedElements =
  ({ selected }: Props) =>
  (object: IMimicElement) => {
    lodash.remove(object.children, (element: IMimicElement) =>
      selected.includes(element.attributes.general.id)
    );
  };

export default removeSelectedElements;
