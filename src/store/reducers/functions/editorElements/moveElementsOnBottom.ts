import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  selected: number[];
}

const moveElementsOnBottom =
  ({ selected }: Props) =>
  (object: MimicElementProps) => {
    const newState = [];
    const movementArr = [];
    const selectedArr = [...selected];

    if (selectedArr.length > 0) {
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
      object.children = [...movementArr, ...newState];
    }
  };

export default moveElementsOnBottom;
