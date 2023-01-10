import lodash from "lodash";

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
} from "../actionTypes/editorElements";
import { PASTE_ELEMENTS } from "../actionTypes/editorState";
import { ELEMENT_TYPE_FRAME } from "../../constants/literals";
import { IMimicElement } from "../../models/Editor";
import { demo1JSON } from "../../constants/demo/templateJson";
import changeElementAttribute from "./logic/editorElements/elementModifier/changeElementAttribute";
import appendElementPoint from "./logic/editorElements/elementModifier/appendElementPoint";
import changeElementAngle from "./logic/editorElements/elementModifier/changeElementAngle";
import changeElementLastPoint from "./logic/editorElements/elementModifier/changeElementLastPoint";
import changeElementPoint from "./logic/editorElements/elementModifier/changeElementPoint";
import createElement from "./logic/editorElements/crud/createElement";
import deleteElementLastPoint from "./logic/editorElements/elementModifier/deleteElementLastPoint";
import moveElementPoints from "./logic/editorElements/elementModifier/moveElementPoints";
import executeElementsRoutine from "./logic/editorElements/executeElementsRoutine";
import removeSelectedElements from "./logic/editorElements/crud/removeSelectedElements";
import resizeElement from "./logic/editorElements/elementModifier/resizeElement";
import pasteElements from "./logic/editorElements/crud/pasteElements";
import getLastGID from "./logic/editorElements/crud/getLastGID";
import groupElements from "./logic/editorElements/group/groupElements";
import unGroupElements from "./logic/editorElements/group/unGroupElements";
import alignLeft from "./logic/editorElements/align/alignLeft";
import alignHorizon from "./logic/editorElements/align/alignHorizon";
import alignRight from "./logic/editorElements/align/alignRight";
import alignTop from "./logic/editorElements/align/alignTop";
import alignVertical from "./logic/editorElements/align/alignVertical";
import alignBottom from "./logic/editorElements/align/alignBottom";
import moveElementsOnTop from "./logic/editorElements/move/moveElementsOnTop";
import moveElementsOnBottom from "./logic/editorElements/move/moveElementsOnBottom";
import moveElementsOnForward from "./logic/editorElements/move/moveElementsOnForward";
import moveElementsOnBack from "./logic/editorElements/move/moveElementsOnBack";
import { TransformerBase } from "../../constants/mimicBaseElements/TransformerBase";

const defaultState: IMimicElement = {
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

const editorElements = (state = defaultState, action: any): IMimicElement => {
  switch (action.type) {
    case CREATE_ELEMENT: {
      const { parentId, id, newElement, point } = action.payload;
      const { type, attributes } = newElement;
      const pointsAmount = TransformerBase[type].maxPoints;
      const root = lodash.cloneDeep(state);
      const func = createElement({ id, type, attributes, point, pointsAmount });
      executeElementsRoutine(parentId || 0, root, func);

      return { ...root };
    }

    case DELETE_SELECTED_ELEMENTS: {
      const { parentId, selected } = action.payload;

      if (selected.length > 0) {
        const root = lodash.cloneDeep(state);
        const func = removeSelectedElements({ selected });
        executeElementsRoutine(parentId || 0, root, func);
        return { ...root };
      } else {
        return state;
      }
    }

    case APPEND_POINT_TO_ELEMENT: {
      const { id, point } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = appendElementPoint({ point });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case DELETE_LAST_POINT_OF_ELEMENT: {
      const { id } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = deleteElementLastPoint();
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case CHANGE_POINT_POSITION: {
      const { id, pointNo, point } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementPoint({ pointNo, point });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case MOVE_ELEMENT_POINTS: {
      const { id, movement } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementPoints({ movement });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case MOVE_ELEMENT_GROUP: {
      const { selected, movement } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementPoints({ movement });
      executeElementsRoutine(selected, root, func);
      return { ...root };
    }

    case REDRAW_LAST_POINT: {
      const { id, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementLastPoint({ point });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case CHANGE_ELEMENT_ANGLE: {
      const { id, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementAngle({ point });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case RESIZE_ELEMENT: {
      const { id, pointName: targetName, point } = action?.payload;
      const root = lodash.cloneDeep(state);
      const func = resizeElement({ targetName, point });
      executeElementsRoutine(id, root, func);
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
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_BOTTOM_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnBottom({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_FORWARD_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnForward({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case MOVE_ELEMENTS_ON_BACK_LEVEL: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = moveElementsOnBack({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case CHANGE_ATTRIBUTES: {
      const { id, propFamily, name, value } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = changeElementAttribute({ propFamily, name, value });
      executeElementsRoutine(id, root, func);
      return { ...root };
    }

    case ELEMENTS_LEFT_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignLeft({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_HORIZON_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignHorizon({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_RIGHT_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignRight({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_TOP_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignTop({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_VERTICAL_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignVertical({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case ELEMENTS_BOTTOM_ALIGN: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = alignBottom({ selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case PASTE_ELEMENTS: {
      const { parentId, elements } = action.payload;
      const root = lodash.cloneDeep(state);
      const lastId: number = getLastGID(root.attributes.general.id, root) + 1;
      const func = pasteElements({ elements, id: lastId });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case GROUP_ELEMENTS: {
      const { parentId, selected } = action.payload;
      const root = lodash.cloneDeep(state);
      const id = getLastGID(root.attributes.general.id, root) + 1;
      const func = groupElements({ id, selected });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    case UNGROUP_ELEMENTS: {
      const { parentId, id } = action.payload;
      const root = lodash.cloneDeep(state);
      const func = unGroupElements({ id });
      executeElementsRoutine(parentId || 0, root, func);
      return { ...root };
    }

    default: {
      return state;
    }
  }
};

export default editorElements;
