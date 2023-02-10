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
import { PASTE_ELEMENTS_FROM_BUFFER } from "../actionTypes/editorState";
import { ELEMENT_TYPE_FRAME } from "../../constants/literals";
import { IMimicElement } from "../../models/Editor";
import { demo1JSON } from "../../constants/demo/templateJson";
import changeElementAttribute from "../../utils/editor/Elements/elementModifier/changeElementAttribute";
import appendElementPoint from "../../utils/editor/Elements/elementModifier/appendElementPoint";
import changeElementAngle from "../../utils/editor/Elements/elementModifier/changeElementAngle";
import changeElementLastPoint from "../../utils/editor/Elements/elementModifier/changeElementLastPoint";
import changeElementPoint from "../../utils/editor/Elements/elementModifier/changeElementPoint";
import createElement from "../../utils/editor/Elements/crud/createElement";
import deleteElementLastPoint from "../../utils/editor/Elements/elementModifier/deleteElementLastPoint";
import moveElementPoints from "../../utils/editor/Elements/elementModifier/moveElementPoints";
import executeElementsRoutine from "../../utils/editor/Elements/executeElementsRoutine";
import removeSelectedElements from "../../utils/editor/Elements/crud/removeSelectedElements";
import resizeElement from "../../utils/editor/Elements/elementModifier/resizeElement";
import pasteElements from "../../utils/editor/Elements/crud/pasteElements";
import getLastGID from "../../utils/editor/Elements/crud/getLastGID";
import groupElements from "../../utils/editor/Elements/group/groupElements";
import unGroupElements from "../../utils/editor/Elements/group/unGroupElements";
import alignLeft from "../../utils/editor/Elements/align/alignLeft";
import alignHorizon from "../../utils/editor/Elements/align/alignHorizon";
import alignRight from "../../utils/editor/Elements/align/alignRight";
import alignTop from "../../utils/editor/Elements/align/alignTop";
import alignVertical from "../../utils/editor/Elements/align/alignVertical";
import alignBottom from "../../utils/editor/Elements/align/alignBottom";
import moveElementsOnTop from "../../utils/editor/Elements/move/moveElementsOnTop";
import moveElementsOnBottom from "../../utils/editor/Elements/move/moveElementsOnBottom";
import moveElementsOnForward from "../../utils/editor/Elements/move/moveElementsOnForward";
import moveElementsOnBack from "../../utils/editor/Elements/move/moveElementsOnBack";
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

    case PASTE_ELEMENTS_FROM_BUFFER: {
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
