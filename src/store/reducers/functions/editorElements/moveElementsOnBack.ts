import { MimicElementProps } from "../../../../models/Editor";
import changeIndexArr from "../changeIndexArray";

interface Props {
  selected: number[];
}

const moveElementsOnBack =
  ({ selected }: Props) =>
  (object: MimicElementProps) => {
    const newChildrenState = [...object.children];
    const selectedArr = [...selected];

    if (selected.length === 1) {
      for (let i = 0; i < object.children.length; i++) {
        const element = object.children[i];

        let included = false;

        for (let j = 0; j < selectedArr.length; j++) {
          if (selectedArr[j] === element.attributes.general.id) {
            included = true;
            selectedArr.splice(j, 1);
            break;
          }
        }

        if (included && i > 0) {
          changeIndexArr(newChildrenState, i, i - 1);
        }
      }
    }

    object.children = [...newChildrenState];
  };

export default moveElementsOnBack;
