import { IMimicElement } from "../../../../models/Editor";
import changeIndexArr from "../../changeIndexArray";

const moveElementsOnForward =
  ({ selected }: IMoveProps) =>
  (object: IMimicElement) => {
    if (selected.length === 1) {
      const selectedArr = [...selected];
      const newChildrenState = [...object.children];

      for (let i = 0; i < object.children.length; i++) {
        let included = false;
        const element = object.children[i];

        for (let j = 0; j < selectedArr.length; j++) {
          if (selectedArr[j] === element.attributes.general.id) {
            included = true;
            selectedArr.splice(j, 1);
            break;
          }
        }

        if (included && i < object.children.length - 1) {
          changeIndexArr(newChildrenState, i, i + 1);
        }
      }

      object.children = [...newChildrenState];
    }
  };

export default moveElementsOnForward;
