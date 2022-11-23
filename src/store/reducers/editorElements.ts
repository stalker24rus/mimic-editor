import lodash, { merge } from "lodash";
import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_ELEMENT,
  DELETE_LAST_POINT_OF_ELEMENT,
  MOVE_ELEMENT,
  MOVE_ELEMENT_BACK_LAYER,
  MOVE_ELEMENT_TOP_LAYER,
  RESIZE_ELEMENT,
  UPDATE_ELEMENT,
  UPDATE_LAST_POINT_OF_ELEMENT,
} from "../../constants/actionTypes/editorElements";
import { MimicElementProps } from "../../models/Editor";

const defaultState: MimicElementProps[] = [];

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
      const elements = [...state];
      const { id, attributes } = action.payload;

      const index = elements?.findIndex(
        (element: MimicElementProps) => element.attributes.general.id === id
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
        (element: MimicElementProps) => element.attributes.general.id === id
      );
      return newElements;
    }

    case APPEND_POINT_TO_ELEMENT: {
      const elements = [...state];
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
        return newElements;
      }
      return state;
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const elements = [...state];
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
        return newElements;
      } else {
        return state;
      }
    }

    case CHANGE_ELEMENT_ANGLE: {
      /*
          let boxCenter = {
            x: topLeftPoint.x + width / 2,
            y: topLeftPoint.y + height / 2,
          };

          let angle =
            Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
            (180 / Math.PI);

          onSetAttributes({
            position: {
              angle: angle > 179.5 || angle < -179.5 ? 180 : Math.trunc(angle),
            },
          });
      */
      return state;
    }

    case MOVE_ELEMENT: {
      /*
      const attributes = {
        position: {
          points: [
            {
              y: topLeftPoint.y + e.movementY,
              x: topLeftPoint.x + e.movementX,
            },
          ],
        },
      };
      onSetAttributes(attributes);
      */
      return state;
    }

    case RESIZE_ELEMENT: {
      /*
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        const targetName = event.target.className;

        const { left: mainLeft, top: mainTop } = document
          .getElementById(MIMIC_FRAME_ID)
          .getBoundingClientRect();

        const result = resizeBox({
          ...topLeftPoint,
          width,
          height,
          cursorX: cursorX - mainLeft,
          cursorY: cursorY - mainTop,
          angle,
          targetName,
        });

        onSetAttributes({ position: { ...result } });
      */
      return state;
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
