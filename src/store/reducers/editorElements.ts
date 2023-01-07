import lodash from "lodash";
import { ElementBase } from "../../components/Mimic/Hooks/useDrawElement";
import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_SELECTED_ELEMENTS,
  DELETE_LAST_POINT_OF_ELEMENT,
  REDRAW_LAST_POINT,
  RESIZE_ELEMENT,
  HISTORY_POINT_FOR_CHANGES,
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
  UNGROUP_ELEMENTS,
  GROUP_ELEMENTS,
} from "../../constants/actionTypes/editorElements";
import { PASTE_ELEMENTS } from "../../constants/actionTypes/editorState";
import { ELEMENT_TYPE_FRAME } from "../../constants/literals";
import { MimicElementProps } from "../../models/Editor";
import { demo1JSON } from "../demo/templateJson";
import {
  alignBottom,
  alignHorizon,
  alignLeft,
  alignRight,
  alignTop,
  alignVertical,
} from "./functions/alighElements";
import changeAttribute from "./functions/editorElements/changeAttributes";
// import changeIndexArr from "./functions/changeIndexArray";
import appendElementPoint from "./functions/editorElements/appendElementPoint";
import changeElementAngle from "./functions/editorElements/changeElementAngle";
import changeElementLastPoint from "./functions/editorElements/changeElementLastPoint";
import changeElementPoint from "./functions/editorElements/changeElementPoint";
import createElement from "./functions/editorElements/createElement";
import deleteElementLastPoint from "./functions/editorElements/deleteElementLastPoint";
import moveElementsOnBottom from "./functions/editorElements/moveElementsOnBottom";
import moveElementsOnTop from "./functions/editorElements/moveElementsOnTop";
import moveElementPoints from "./functions/editorElements/moveElementPoints";
import mutateElement from "./functions/editorElements/mutateElement";
import removeSelectedElements from "./functions/editorElements/removeSelectedElements";
import resizeElement from "./functions/editorElements/resizeElement";
// import updateElement from "./functions/editorElements/updateElement";
// import resizeBox from "./functions/resizeBox";
import moveElementsOnForward from "./functions/editorElements/moveElementsOnForward";
import moveElementsOnBack from "./functions/editorElements/moveElementsOnBack";
import pasteElements from "./functions/editorElements/pasteElements";
import getLastGID from "./functions/editorElements/getLastGID";
import groupElements from "./functions/editorElements/groupElements";
import unGroupElements from "./functions/editorElements/unGroupElements";

const defaultState: MimicElementProps = {
  type: ELEMENT_TYPE_FRAME,
  layer: 0,
  attributes: {
    general: {
      id: 0, // ALWAYS ZERO
      name: "Демо-мнемосхема",
      tagName: undefined,
    },
    position: {
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

export default (state = defaultState, action: any): MimicElementProps => {
  switch (action.type) {
    case CREATE_ELEMENT: {
      const { parentId, id, newElement, point } = action.payload;
      const { type, attributes } = newElement;
      const pointsAmount = ElementBase[type].maxPoints;

      const root = lodash.cloneDeep(state);
      // const lastId: number = getLastGID(root.attributes.general.id, root) + 1;
      const func = createElement({ id, type, attributes, point, pointsAmount });
      mutateElement(parentId || 0, root, func);

      return { ...root };
    }

    case DELETE_SELECTED_ELEMENTS: {
      const { parentId, selected } = action.payload;

      if (selected.length > 0) {
        const root = lodash.cloneDeep(state);
        const func = removeSelectedElements({ selected });
        mutateElement(parentId || 0, root, func);
        return { ...root };
      } else {
        return state;
      }
    }

    case APPEND_POINT_TO_ELEMENT: {
      const { id, point } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = appendElementPoint({ point });
      mutateElement(id, root, func);
      return { ...root };
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const { id } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = deleteElementLastPoint();
      mutateElement(id, root, func);
      return { ...root };
    }

    case CHANGE_POINT_POSITION: {
      const { id, pointNo, point } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementPoint({ pointNo, point });
      mutateElement(id, root, func);
      return { ...root };
    }

    case MOVE_ELEMENT_POINTS: {
      const { id, movement } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementPoints({ movement });
      mutateElement(id, root, func);
      return { ...root };
    }

    case MOVE_ELEMENT_GROUP: {
      const { selected, movement } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementPoints({ movement });
      mutateElement(selected, root, func);
      return { ...root };
    }

    case REDRAW_LAST_POINT: {
      const { id, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementLastPoint({ point });
      mutateElement(id, root, func);
      return { ...root };
    }

    case CHANGE_ELEMENT_ANGLE: {
      const { id, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementAngle({ point });
      mutateElement(id, root, func);
      return { ...root };
    }

    case RESIZE_ELEMENT: {
      const { id, pointName: targetName, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = resizeElement({ targetName, point });
      mutateElement(id, root, func);
      return { ...root };
    }

    case HISTORY_POINT_FOR_CHANGES: {
      const root = lodash.cloneDeep(state);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_TOP_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnTop({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_BOTTOM_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnBottom({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_FORWARD_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnForward({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_BACK_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnBack({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case CHANGE_ATTRIBUTES: {
      const { id, propFamily, name, value } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = changeAttribute({ propFamily, name, value });
      mutateElement(id, root, func);
      return { ...root };
    }

    case ELEMENTS_LEFT_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignLeft({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_HORIZON_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignHorizon({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_RIGHT_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignRight({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_TOP_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignTop({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_VERTICAL_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignVertical({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_BOTTOM_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignBottom({ selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case PASTE_ELEMENTS: {
      const { parentId, elements } = action.payload;
      const root = lodash.cloneDeep(state);
      const lastId: number = getLastGID(root.attributes.general.id, root) + 1;
      const func = pasteElements({ elements, id: lastId });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case GROUP_ELEMENTS: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const id = getLastGID(root.attributes.general.id, root) + 1;
      const func = groupElements({ id, selected });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    case UNGROUP_ELEMENTS: {
      const { parentId, id } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = unGroupElements({ id });
      mutateElement(parentId || 0, root, func);
      return { ...root };
    }

    default: {
      return state;
    }
  }
};
