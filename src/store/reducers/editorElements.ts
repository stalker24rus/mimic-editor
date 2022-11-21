import lodash, { merge } from "lodash";
import {
  APPEND_POINT_TO_ELEMENT,
  CREATE_ELEMENT,
  DELETE_ELEMENT,
  DELETE_LAST_POINT_OF_ELEMENT,
  MOVE_ELEMENT_BACK,
  MOVE_ELEMENT_TOP,
  UPDATE_ELEMENT,
  UPDATE_LAST_POINT_OF_ELEMENT,
} from "../../constants/actionTypes/editorElements";
import { Component } from "../../models/Editor";

const defaultState: Component[] = [];

export default (state = defaultState, action) => {
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
      const elements = [...state];
      const { id, attributes } = action.payload;

      const index = elements?.findIndex(
        (element: Component) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const mergedElement = { ...merge({}, element, { attributes }) };
        const newElements = lodash.cloneDeep(elements);
        newElements[index] = { ...mergedElement };
        return newElements;
      } else {
        return state;
      }
    }

    case DELETE_ELEMENT: {
      const elements = [...state];
      const { id } = action.payload;
      const newElements = [...elements];
      lodash.remove(
        newElements,
        (element: Component) => element.attributes.general.id === id
      );
      return newElements; //!!!!
    }

    case APPEND_POINT_TO_ELEMENT: {
      const elements = [...state];
      const { id, point } = action.payload;

      const index = elements.findIndex(
        (element: Component) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points, point];
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements);
        newElements[index] = { ...element };
        return newElements;
      }
      return state;
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const elements = [...state];
      const { id } = action.payload;

      const index = elements.findIndex(
        (element: Component) => element.attributes.general.id === id
      );

      if (index > -1) {
        const element = { ...elements[index] };
        const points = [...element.attributes.position.points];
        points.pop();
        element.attributes.position.points = [...points];
        const newElements = lodash.cloneDeep(elements);
        newElements[index] = { ...element };
        return newElements;
      } else {
        return state;
      }
    }

    case UPDATE_LAST_POINT_OF_ELEMENT: {
      return state;
    }

    case MOVE_ELEMENT_TOP: {
      return state;
    }

    case MOVE_ELEMENT_BACK: {
      return state;
    }

    default: {
      return state;
      throw Error("Unknown action: " + action.type);
    }
  }
};
