import lodash, { merge } from "lodash";
import { ElementBase } from "../../components/Mimic/Hooks/useDrawElement";
import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_SELECTED_ELEMENTS,
  DELETE_LAST_POINT_OF_ELEMENT,
  MOVE_ELEMENT,
  // MOVE_ELEMENT_BACK_LAYER,
  // MOVE_ELEMENT_TOP_LAYER,
  REDRAW_LAST_POINT,
  RESIZE_ELEMENT,
  HISTORY_POINT_FOR_CHANGES,
  UPDATE_ELEMENT,
  // UPDATE_LAST_POINT_OF_ELEMENT,
  CHANGE_POINT_POSITION,
  MOVE_ELEMENT_POINTS,
  MOVE_ELEMENT_GROUP,
  MOVE_ELEMENTS_ON_TOP_LEVEL,
  MOVE_ELEMENTS_ON_BOTTOM_LEVEL,
  MOVE_ELEMENTS_ON_FORWARD_LEVEL,
  MOVE_ELEMENTS_ON_BACK_LEVEL,
  CHANGE_ATTRIBUTES,
  ELEMENTS_LEFT_ALIGN,
  ELEMENTS_HORIZON_ALIGN,
  ELEMENTS_RIGHT_ALIGN,
  ELEMENTS_TOP_ALIGN,
  ELEMENTS_VERTICAL_ALIGN,
  ELEMENTS_BOTTOM_ALIGN,
} from "../../constants/actionTypes/editorElements";
import { PASTE_ELEMENTS } from "../../constants/actionTypes/editorState";
import { ELEMENT_TYPE_FRAME } from "../../constants/literals";
import { MimicElementProps } from "../../models/Editor";
import { getNewId } from "../actionCreators/editorElements";
import { demo1JSON } from "../demo/templateJson";
import {
  alignBottom,
  alignHorizon,
  alignLeft,
  alignRight,
  alignTop,
  alignVertical,
} from "./functions/alighElements";
import changeAttribute from "./functions/changeAttributes";
import changeIndexArr from "./functions/changeIndexArray";
import resizeBox from "./functions/resizeBox";

const defaultState: MimicElementProps = {
  type: ELEMENT_TYPE_FRAME,
  layer: 0,
  attributes: {
    general: {
      id: 0, // ALWAYS ZERO
      name: "mimic.frame",
      tagName: undefined,
    },
    position: {
      points: [
        {
          x: 0,
          y: 0,
        },
      ],
      width: 1900,
      height: 1080,
    },
    appearance: {
      fill: "#CECECE",
    },
    properties: {
      title: "Mimic",
    },
  },
  children: JSON.parse(demo1JSON),
};

const selectElement = (state: any, id: number) =>
  state.editorElements.find(
    (element: MimicElementProps) => element.attributes.general.id === id
  );
const selectElementPointsLength = (element: MimicElementProps) =>
  element.attributes.position.points.length;

export default (state = defaultState, action: any): MimicElementProps => {
  switch (action.type) {
    case CREATE_ELEMENT: {
      const { id, newElement, point } = action.payload;
      const { type, attributes } = newElement;
      const pointsAmount = ElementBase[type].maxPoints;

      const element = {
        type: type,
        layer: id,
        attributes: {
          ...attributes,
          position: {
            ...attributes.position,
            points: pointsAmount <= 1 ? [point] : [point, point],
          },
          general: { id: id, name: type + id, tagName: "" },
        },
        children: [],
      };

      return { ...state, children: [...state.children, element] };
    }

    case UPDATE_ELEMENT: {
      const elements = lodash.cloneDeep(state.children); //FIXME
      const { id, attributes } = action.payload;

      const index = elements?.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const mergedElement = { ...merge({}, element, { attributes }) };
        const newElements = lodash.cloneDeep(elements); //FIXME
        newElements[index] = { ...mergedElement };
        return { ...state, children: [...newElements] };
      } else {
        return state;
      }
    }

    case DELETE_SELECTED_ELEMENTS: {
      const elements = lodash.cloneDeep(state.children);
      const { selected } = action.payload;

      if (selected.length > 0) {
        const newElements = lodash.cloneDeep(elements);
        lodash.remove(newElements, (element: MimicElementProps) =>
          selected.includes(element.attributes.general.id)
        );
        return { ...state, children: [...newElements] };
      } else {
        return state;
      }
    }

    case APPEND_POINT_TO_ELEMENT: {
      const elements = lodash.cloneDeep(state.children);
      const { id, point } = action.payload;

      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points, point];
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements);
        newElements[index] = { ...element };
        return { ...state, children: [...newElements] };
      }
      return state;
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const elements = lodash.cloneDeep(state.children);
      const { id } = action.payload;

      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points];
        points.pop();
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements);
        newElements[index] = { ...element };
        return { ...state, children: [...newElements] };
      } else {
        return state;
      }
    }

    case CHANGE_POINT_POSITION: {
      const { id, pointNo, point } = action.payload;
      const index = state.children.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state.children[index] };
        element.attributes.position.points[pointNo] = { ...point };
        const elements = lodash.cloneDeep(state.children);
        elements[index] = { ...element };
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENT_POINTS: {
      const { id, movement } = action.payload;
      const index = state.children.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state.children[index] };

        const newPoints = element.attributes.position.points.map(function (
          element
        ) {
          return {
            x: element.x + movement.x,
            y: element.y + movement.y,
          };
        });

        element.attributes.position.points = [...newPoints];
        const elements = lodash.cloneDeep(state.children);

        elements[index] = { ...element };
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENT_GROUP: {
      const { selected, movement } = action.payload;
      const elements = lodash.cloneDeep(state.children);

      for (let i = 0; i < selected.length; i++) {
        const index = state.children.findIndex(
          (element: MimicElementProps) =>
            element.attributes.general.id === selected[i]
        );

        if (index > -1) {
          const element = { ...state.children[index] };

          const newPoints = element.attributes.position.points.map(function (
            element
          ) {
            return {
              x: element.x + movement.x,
              y: element.y + movement.y,
            };
          });
          element.attributes.position.points = [...newPoints];
          elements[index] = { ...element };
        }
      }

      if (selected.length > 0) {
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case REDRAW_LAST_POINT: {
      const { id, point } = action?.payload;

      const index = state.children.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state.children[index] };
        const pointsLength = selectElementPointsLength(element);

        if (pointsLength > 0) {
          element.attributes.position.points[pointsLength - 1] = { ...point };
        } else {
          element.attributes.position.points.push({ ...point });
        }

        const newElements = lodash.cloneDeep(state.children);
        newElements[index] = { ...element };
        return { ...state, children: [...newElements] };
      } else {
        return state;
      }
    }

    case CHANGE_ELEMENT_ANGLE: {
      const { id, point } = action?.payload;
      const elements = lodash.cloneDeep(state.children);
      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        // TODO ADD SELECTOR
        // FIXME
        const topLeft = elements[index]?.attributes.position.points[0];
        const width = elements[index]?.attributes.position.width;
        const height = elements[index]?.attributes.position.height;

        const boxCenter = {
          x: topLeft.x + width / 2,
          y: topLeft.y + height / 2,
        };

        const angle =
          Math.atan2(point.x - boxCenter.x, -(point.y - boxCenter.y)) *
          (180 / Math.PI);

        elements[index].attributes.position.angle = angle;
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENT: {
      const { id, point } = action?.payload;
      const elements = lodash.cloneDeep(state.children);
      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        elements[index].attributes.position.points[0] = { ...point };
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case RESIZE_ELEMENT: {
      const { id, pointName: targetName, point } = action?.payload;
      const elements = lodash.cloneDeep(state.children);
      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const { points, width, height, angle } =
          elements[index].attributes.position;
        const { x, y } = points[0];

        const newPosition = resizeBox({
          x,
          y,
          width,
          height,
          cursorX: point.x,
          cursorY: point.y,
          angle,
          targetName,
        });
        elements[index].attributes.position = {
          ...elements[index].attributes.position,
          ...newPosition,
        };
        return { ...state, children: [...elements] };
      } else {
        return state;
      }
    }

    case HISTORY_POINT_FOR_CHANGES: {
      const newState = lodash.cloneDeep(state);
      return { ...newState };
    }

    case MOVE_ELEMENTS_ON_TOP_LEVEL: {
      const { selected } = action.payload;
      const newState = [];
      const movementArr = [];
      const selectedArr = [...selected];

      if (selectedArr.length > 0) {
        for (let i = 0; i < state.children.length; i++) {
          const element = state.children[i];

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
        return { ...state, children: [...newState, ...movementArr] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENTS_ON_BOTTOM_LEVEL: {
      const { selected } = action.payload;
      const newState = [];
      const movementArr = [];
      const selectedArr = [...selected];

      if (selectedArr.length > 0) {
        for (let i = 0; i < state.children.length; i++) {
          const element = state.children[i];

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
        return { ...state, children: [...movementArr, ...newState] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENTS_ON_FORWARD_LEVEL: {
      const { selected } = action.payload;
      const newState = [...state.children];
      const selectedArr = [...selected];

      if (selectedArr.length === 1) {
        for (let i = 0; i < state.children.length; i++) {
          const element = state.children[i];

          let included = false;

          for (let j = 0; j < selectedArr.length; j++) {
            if (selectedArr[j] === element.attributes.general.id) {
              included = true;
              selectedArr.splice(j, 1);
              break;
            }
          }

          if (included && i < state.children.length - 1) {
            changeIndexArr(newState, i, i + 1);
          }
        }
        return { ...state, children: [...newState] };
      } else {
        return state;
      }
    }

    case MOVE_ELEMENTS_ON_BACK_LEVEL: {
      const { selected } = action.payload;
      const newState = [...state.children];
      const selectedArr = [...selected];

      if (selected.length === 1) {
        for (let i = 0; i < state.children.length; i++) {
          const element = state.children[i];

          let included = false;

          for (let j = 0; j < selectedArr.length; j++) {
            if (selectedArr[j] === element.attributes.general.id) {
              included = true;
              selectedArr.splice(j, 1);
              break;
            }
          }

          if (included && i > 0) {
            changeIndexArr(newState, i, i - 1);
          }
        }
        return { ...state, children: [...newState] };
      } else {
        return state;
      }
    }

    case CHANGE_ATTRIBUTES: {
      const { id, propFamily, name, value } = action.payload;
      const main = lodash.cloneDeep(state);
      changeAttribute(id, main, { propFamily, name, value });
      return { ...main };
    }

    // case UPDATE_LAST_POINT_OF_ELEMENT: {
    //   return state;
    // }

    // case MOVE_ELEMENT_TOP_LAYER: {
    //   return state;
    // }

    // case MOVE_ELEMENT_BACK_LAYER: {
    //   return state;
    // }

    case ELEMENTS_LEFT_ALIGN: {
      const { selected } = action.payload;
      const elements = alignLeft(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case ELEMENTS_HORIZON_ALIGN: {
      const { selected } = action.payload;
      const elements = alignHorizon(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case ELEMENTS_RIGHT_ALIGN: {
      const { selected } = action.payload;
      const elements = alignRight(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case ELEMENTS_TOP_ALIGN: {
      const { selected } = action.payload;
      const elements = alignTop(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case ELEMENTS_VERTICAL_ALIGN: {
      const { selected } = action.payload;
      const elements = alignVertical(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case ELEMENTS_BOTTOM_ALIGN: {
      const { selected } = action.payload;
      const elements = alignBottom(selected, state.children);
      return { ...state, children: [...elements] };
    }

    case PASTE_ELEMENTS: {
      const { elements } = action.payload;
      let lastId: number = getNewId(state.children);
      let newElements: MimicElementProps[] = [];

      for (let i = 0; i < elements.length; i++) {
        const element: MimicElementProps = elements[i];
        element.attributes.general.id = lastId;
        newElements.push(lodash.cloneDeep(element));
        lastId++;
      }
      return { ...state, children: [...state.children, ...newElements] };
    }

    default: {
      return state;
    }
  }
};
