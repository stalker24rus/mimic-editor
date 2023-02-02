import { IMimicElement } from "../../../../models/Editor";

const moveElementsOnTop =
  ({ selected }: IMoveProps) =>
  (object: IMimicElement) => {
    const newState = [];
    const movementArr = [];
    const selectedArr = [...selected];

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

      if (included) {
        movementArr.push(element);
      } else {
        newState.push(element);
      }
    }
    object.children = [...newState, ...movementArr];
  };

export default moveElementsOnTop;
