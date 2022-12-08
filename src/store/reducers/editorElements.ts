import lodash, { merge } from "lodash";
import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_SELECTED_ELEMENTS,
  DELETE_LAST_POINT_OF_ELEMENT,
  MOVE_ELEMENT,
  MOVE_ELEMENT_BACK_LAYER,
  MOVE_ELEMENT_TOP_LAYER,
  REDRAW_LAST_POINT,
  RESIZE_ELEMENT,
  HISTORY_POINT_FOR_CHANGES,
  UPDATE_ELEMENT,
  UPDATE_LAST_POINT_OF_ELEMENT,
  CHANGE_POINT_POSITION,
  MOVE_ELEMENT_POINTS,
} from "../../constants/actionTypes/editorElements";
import { MimicElementProps } from "../../models/Editor";
import resizeBox from "./functions/resizeBox";

const defaultState: MimicElementProps[] = [];

const selectElement = (state: any, id: number) =>
  state.editorElements.find(
    (element: MimicElementProps) => element.attributes.general.id === id
  );
const selectElementPointsLength = (element: MimicElementProps) =>
  element.attributes.position.points.length;

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case CREATE_ELEMENT: {
      const { id, newElement, point } = action.payload;
      const { type, attributes, service } = newElement;
      const pointsAmount = service.pointsAmount;

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
        service: service,
        children: [],
      };

      return [...state, element];
    }

    case UPDATE_ELEMENT: {
      const elements = lodash.cloneDeep(state); //FIXME
      const { id, attributes } = action.payload;

      const index = elements?.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const mergedElement = { ...merge({}, element, { attributes }) };
        const newElements = lodash.cloneDeep(elements); //FIXME
        newElements[index] = { ...mergedElement };
        return newElements;
      } else {
        return state;
      }
    }

    case DELETE_SELECTED_ELEMENTS: {
      const elements = [...state];
      const { selected } = action.payload;

      if (selected.length > 0) {
        const newElements = lodash.cloneDeep(elements);
        lodash.remove(newElements, (element: MimicElementProps) =>
          selected.includes(element.attributes.general.id)
        );
        return newElements;
      } else {
        return state;
      }
    }

    case APPEND_POINT_TO_ELEMENT: {
      const elements = lodash.cloneDeep(state); //FIXME
      const { id, point } = action.payload;

      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points, point];
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements); //FIXME
        newElements[index] = { ...element };
        return newElements;
      }
      return state;
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const elements = lodash.cloneDeep(state); //FIXME
      const { id } = action.payload;

      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points];
        points.pop();
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements); // FIXME
        newElements[index] = { ...element };
        return newElements;
      } else {
        return state;
      }
    }

    case CHANGE_POINT_POSITION: {
      const { id, pointNo, point } = action.payload;
      const index = state.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state[index] };
        element.attributes.position.points[pointNo] = { ...point };
        const elements = lodash.cloneDeep(state);
        elements[index] = { ...element };
        return elements;
      } else {
        return state;
      }
    }

    case MOVE_ELEMENT_POINTS: {
      const { id, movement } = action.payload;
      const index = state.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state[index] };

        const newPoints = element.attributes.position.points.map(function (
          element
        ) {
          return {
            x: element.x + movement.x,
            y: element.y + movement.y,
          };
        });

        element.attributes.position.points = [...newPoints];
        const elements = lodash.cloneDeep(state);

        elements[index] = { ...element };
        return elements;
      } else {
        return state;
      }
    }

    case REDRAW_LAST_POINT: {
      const { id, point } = action?.payload;

      const index = state.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...state[index] };
        const pointsLength = selectElementPointsLength(element);

        if (pointsLength > 0) {
          element.attributes.position.points[pointsLength - 1] = { ...point };
        } else {
          element.attributes.position.points.push({ ...point });
        }

        const newElements = lodash.cloneDeep(state);
        newElements[index] = { ...element };
        return newElements;
      } else {
        return state;
      }
    }

    case CHANGE_ELEMENT_ANGLE: {
      const { id, point } = action?.payload;
      const elements = lodash.cloneDeep(state);
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
        return [...elements];
      } else {
        return state;
      }
    }

    case MOVE_ELEMENT: {
      const { id, point } = action?.payload;
      const elements = lodash.cloneDeep(state);
      const index = elements.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
      );

      if (index > -1) {
        elements[index].attributes.position.points[0] = { ...point };
        return [...elements];
      } else {
        return state;
      }
    }

    case RESIZE_ELEMENT: {
      const { id, pointName: targetName, point } = action?.payload;
      const elements = lodash.cloneDeep(state);
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
        return [...elements];
      } else {
        return state;
      }
    }

    case HISTORY_POINT_FOR_CHANGES: {
      const elements = lodash.cloneDeep(state);
      return [...elements];
    }

    case UPDATE_LAST_POINT_OF_ELEMENT: {
      return state;
    }

    case MOVE_ELEMENT_TOP_LAYER: {
      return state;
    }

    case MOVE_ELEMENT_BACK_LAYER: {
      return state;
    }

    default: {
      return state;
    }
  }
};
