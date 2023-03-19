import {
  APPEND_ELEMENT_POINT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_NEW_ELEMENT,
  DELETE_ELEMENT_LAST_POINT,
  CHANGE_ELEMENT_LAST_POINT,
  CHANGE_ELEMENT_SIZE,
  CREATE_HISTORY_CHANGE_POINT,
  CHANGE_ELEMENT_POINT,
  MOVE_ELEMENT_POINTS,
  DELETE_SELECTED_ELEMENTS,
  MOVE_ELEMENTS_GROUP,
  MOVE_ELEMENTS_ON_TOP_LEVEL,
  MOVE_ELEMENTS_ON_BOTTOM_LEVEL,
  MOVE_ELEMENTS_ON_FORWARD_LEVEL,
  MOVE_ELEMENTS_ON_BACK_LEVEL,
  CHANGE_ELEMENT_ATTRIBUTES,
  ALIGN_ELEMENTS_LEFT,
  ALIGN_ELEMENTS_HORIZON,
  ALIGN_ELEMENTS_RIGHT,
  ALIGN_ELEMENTS_TOP,
  ALIGN_ELEMENTS_VERTICAL,
  ALIGN_ELEMENTS_BOTTOM,
  GROUP_ELEMENTS,
  UNGROUP_ELEMENTS,
  API_CHANGE_ELEMENT_ATTRIBUTES,
} from "../actionTypes/editorElements";
import {
  DISABLE_SELECT_OPERATIONS,
  ENABLE_SELECT_OPERATIONS,
  PASTE_ELEMENTS_FROM_BUFFER,
  SET_CREATED_ELEMENT_ID,
  SET_EDIT_MODE,
} from "../actionTypes/editorState";
import {
  REDO_EDITOR_HISTORY,
  UNDO_EDITOR_HISTORY,
} from "../actionTypes/editorHistory";
import {
  IAPIChangeElementAttributes,
  IChangesData,
  IMimicElement,
  IPoint,
} from "../../models/Editor";
import {
  selectCopyPasteBuffer,
  selectNewElement,
  selectSelectedElements,
  selectCanvasRectPosition,
} from "../selectors/editorState";
import { selectMimic } from "../selectors/editableMimic";
import { selectMimicElement } from "../selectors/editableMimic";

import getLastGID from "../../utils/editor/Elements/crud/getLastGID";
import { TransformerBase } from "../../constants/mimicBaseElements/TransformerBase";
import correctPoint from "../../utils/editor/correctPoint";
import uuid from "react-uuid";

export const changeElementAngle =
  (id: number, point: IPoint) => (dispatch: Function) => {
    dispatch({
      type: CHANGE_ELEMENT_ANGLE,
      payload: { id, point },
      passHistrory: true,
    });
  };

export const changeElementSize =
  (id: number, pointName: string, point: IPoint) =>
  (dispatch: Function, getState: Function) => {
    const canvasRect = selectCanvasRectPosition(getState());
    const newPoint = correctPoint(point, canvasRect);
    dispatch({
      type: CHANGE_ELEMENT_SIZE,
      payload: { id, pointName, point: newPoint },
      passHistrory: true,
    });
  };

export const changePointPosition =
  (id: number, pointNo: number, point: IPoint) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    dispatch({
      type: CHANGE_ELEMENT_POINT,
      payload: { id, pointNo, point: newPoint },
      passHistrory: true,
    });
  };

export const moveElementPoints =
  (id: number, movement: IPoint) => (dispatch: Function) => {
    dispatch({
      type: MOVE_ELEMENT_POINTS,
      payload: { id, movement },
      passHistrory: true,
    });
  };

export const moveElementGroup =
  (movement: IPoint) => (dispatch: Function, getState: Function) => {
    // selected: number[],
    const selected = selectSelectedElements(getState());
    dispatch({
      type: MOVE_ELEMENTS_GROUP,
      payload: { selected, movement },
      passHistrory: true,
    });
  };

/**
 * CHANGE LAYER POSITION
 */
export const moveOnTopLevel =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: MOVE_ELEMENTS_ON_TOP_LEVEL,
      payload: { selected },
      passHistrory: false,
    });
  };

export const moveOnBottomLevel =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: MOVE_ELEMENTS_ON_BOTTOM_LEVEL,
      payload: { selected },
      passHistrory: false,
    });
  };

export const moveOnForwardLevel =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: MOVE_ELEMENTS_ON_FORWARD_LEVEL,
      payload: { selected },
      passHistrory: false,
    });
  };

export const moveOnBackLevel =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: MOVE_ELEMENTS_ON_BACK_LEVEL,
      payload: { selected },
      passHistrory: false,
    });
  };

/**
 * DRAWING
 */
// FIXME логически отвественность операций уже лежит вне файла, обобщить
export const startDoingChanges = () => (dispatch: Function) => {
  dispatch({
    type: CREATE_HISTORY_CHANGE_POINT,
    passHistrory: false,
  });
  dispatch({
    type: DISABLE_SELECT_OPERATIONS,
  });
};

export const endDoingChanges = () => (dispatch: Function) => {
  dispatch({
    type: ENABLE_SELECT_OPERATIONS,
    passHistrory: false,
  });
};

export const createElement =
  (point: IPoint) => (dispatch: Function, getState: Function) => {
    // ADD FUNCTION FOR GET A new ID
    const root: IMimicElement = selectMimic(getState());
    // alert(uuid());
    const newLastTakenId = getLastGID(root.attributes.general.id, root) + 1;

    const viewPosition = selectCanvasRectPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    const newElement = selectNewElement(getState());

    dispatch({
      type: CREATE_NEW_ELEMENT,
      payload: { id: newLastTakenId, newElement, point: newPoint },
    });

    dispatch({
      type: SET_CREATED_ELEMENT_ID,
      payload: {
        id: newLastTakenId,
      },
    });

    // TODO THIS IS NOT GOOD
    const pointsAmount = TransformerBase[newElement.type].maxPoints;
    if (pointsAmount <= 1) {
      dispatch({
        type: SET_EDIT_MODE,
      });
    }
  };

export const deleteSelectedElements =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());

    dispatch({
      type: DELETE_SELECTED_ELEMENTS,
      payload: { selected },
      passHistrory: selected.length > 0 ? true : false,
    });
  };

export const appendPointToElement =
  (id: number, point: IPoint) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const newPoint = correctPoint(point, viewPosition);

    const element: IMimicElement = selectMimicElement(getState(), id);

    if (element) {
      const pointAmount = TransformerBase[element.type].maxPoints;
      const pointLength = element.attributes.position.points.length;

      if (pointLength < pointAmount) {
        dispatch({
          type: APPEND_ELEMENT_POINT,
          payload: { id, point: newPoint },
        });
      } else {
        dispatch({
          type: SET_EDIT_MODE,
        });
      }
    } else {
      dispatch({
        type: SET_EDIT_MODE,
      });
    }
  };

export const startCreatingElement =
  (id: number, point: IPoint) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    dispatch({
      type: CHANGE_ELEMENT_LAST_POINT,
      payload: { id, point: newPoint },
      passHistrory: true,
    });
  };

export const endCreatingElement = (id: number) => (dispatch: Function) => {
  dispatch({
    type: DELETE_ELEMENT_LAST_POINT,
    payload: { id },
    passHistrory: true,
  });

  dispatch({
    type: SET_EDIT_MODE,
  });
};

export const undoEditorHistory = () => (dispatch: Function) => {
  dispatch({
    type: UNDO_EDITOR_HISTORY,
  });
};

export const redoEditorHistory = () => (dispatch: Function) => {
  dispatch({
    type: REDO_EDITOR_HISTORY,
  });
};

export const changeElementAttributes =
  (changes: IChangesData) => (dispatch: Function) => {
    dispatch({
      type: CHANGE_ELEMENT_ATTRIBUTES,
      payload: { ...changes },
    });
  };

export const pasteElementsFromBuffer =
  () => (dispatch: Function, getState: Function) => {
    const elements = selectCopyPasteBuffer(getState());
    dispatch({
      type: PASTE_ELEMENTS_FROM_BUFFER,
      payload: { elements },
    });
  };

export const alignElementsLeft =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_LEFT,
      payload: { selected },
    });
  };

export const alignElementsHorizon =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_HORIZON,
      payload: { selected },
    });
  };

export const alignElementsRight =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_RIGHT,
      payload: { selected },
    });
  };

export const alignElementsTop =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_TOP,
      payload: { selected },
    });
  };

export const alignElementsVerticalAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_VERTICAL,
      payload: { selected },
    });
  };

export const alignElementsBottom =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ALIGN_ELEMENTS_BOTTOM,
      payload: { selected },
    });
  };

export const groupElements = () => (dispatch: Function, getState: Function) => {
  const selected = selectSelectedElements(getState());
  dispatch({
    type: GROUP_ELEMENTS,
    payload: { selected },
  });
};

export const unGroupElements =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: UNGROUP_ELEMENTS,
      payload: { id: selected[0] },
    });
  };

// ===========================================
// =================== API ===================
// ===========================================
export const apiChangeElementAttributes = (
  changes: IAPIChangeElementAttributes
) => {
  return {
    type: API_CHANGE_ELEMENT_ATTRIBUTES,
    payload: { ...changes },
  };
};
