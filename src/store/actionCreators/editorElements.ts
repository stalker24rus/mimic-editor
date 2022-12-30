import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_LAST_POINT_OF_ELEMENT,
  MOVE_ELEMENT,
  REDRAW_LAST_POINT,
  RESIZE_ELEMENT,
  HISTORY_POINT_FOR_CHANGES,
  CHANGE_POINT_POSITION,
  MOVE_ELEMENT_POINTS,
  DELETE_SELECTED_ELEMENTS,
  MOVE_ELEMENT_GROUP,
  MOVE_ELEMENTS_ON_TOP_LEVEL,
  MOVE_ELEMENTS_ON_BOTTOM_LEVEL,
  MOVE_ELEMENTS_ON_FORWARD_LEVEL,
  MOVE_ELEMENTS_ON_BACK_LEVEL,
  CHANGE_ATTRIBUTES,
} from "../../constants/actionTypes/editorElements";
import {
  DISABLE_SELECTION,
  ENABLE_SELECTION,
  PASTE_ELEMENTS,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_EDIT,
} from "../../constants/actionTypes/editorState";
import { REDO, UNDO } from "../../constants/actionTypes/undoRedo";
import {
  IChangesData,
  MimicElementProps,
  PointFromat,
} from "../../models/Editor";
import {
  selectCopyPasteBuffer,
  selectNewElement,
  selectSelectedElements,
  selectViewPosition,
} from "../selectors/editorState";
import { selectEditorElements } from "../selectors/editorElements";
import { selectElement } from "../selectors/editorElements";
import { ElementBase } from "../../components/Mimic/Hooks/useDrawElement";

// TODO ??? detach to other file
export function correctPoint(
  point: PointFromat,
  correction: PointFromat
): PointFromat {
  return {
    x: point.x - correction.x,
    y: point.y - correction.y,
  };
}

// TODO ??? detach to other file
export function getNewId(elements: MimicElementProps[]): number {
  let newID: number = 0;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.attributes.general.id > newID) {
      newID = element.attributes.general.id;
    }
  }
  return newID + 1;
}

export const changeElementAngle =
  (id: number, point: PointFromat) => (dispatch: Function) => {
    dispatch({
      type: CHANGE_ELEMENT_ANGLE,
      payload: { id, point },
      passHistrory: true,
    });
  };

export const moveElement =
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    dispatch({
      type: MOVE_ELEMENT,
      payload: { id, point },
      passHistrory: true,
    });
  };

export const resizeElement =
  (id: number, pointName: string, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    dispatch({
      type: RESIZE_ELEMENT,
      payload: { id, pointName, point: newPoint },
      passHistrory: true,
    });
  };

export const changePointPosition =
  (id: number, pointNo: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    dispatch({
      type: CHANGE_POINT_POSITION,
      payload: { id, pointNo, point: newPoint },
      passHistrory: true,
    });
  };

export const moveElementPoints =
  (id: number, movement: PointFromat) => (dispatch: Function) => {
    dispatch({
      type: MOVE_ELEMENT_POINTS,
      payload: { id, movement },
      passHistrory: true,
    });
  };

export const moveElementGroup =
  (selected: number[], movement: PointFromat) => (dispatch: Function) => {
    dispatch({
      type: MOVE_ELEMENT_GROUP,
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
    type: HISTORY_POINT_FOR_CHANGES,
    passHistrory: false,
  });
  dispatch({
    type: DISABLE_SELECTION,
  });
};

export const endDoingChanges = () => (dispatch: Function) => {
  dispatch({
    type: ENABLE_SELECTION,
    passHistrory: false,
  });
};

export const createElement =
  (point: PointFromat) => (dispatch: Function, getState: Function) => {
    // ADD FUNCTION FOR GET A new ID
    const newLastTakenId = getNewId(selectEditorElements(getState())); //selectLastTakenId(getState()) + 1;

    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    const newElement: MimicElementProps = selectNewElement(getState());

    dispatch({
      type: CREATE_ELEMENT,
      payload: { id: newLastTakenId, newElement, point: newPoint },
    });

    dispatch({
      type: SET_LAST_TAKEN_ID,
      payload: {
        id: newLastTakenId,
      },
    });

    dispatch({
      type: SET_DRAWING_ID,
      payload: {
        id: newLastTakenId,
      },
    });

    // TODO THIS IS NOT GOOD
    const pointsAmount = ElementBase[newElement.type].maxPoints;
    if (pointsAmount <= 1) {
      dispatch({
        type: SET_MODE_EDIT,
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
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);

    const element: MimicElementProps = selectElement(getState(), id);

    if (element) {
      const pointAmount = ElementBase[element.type].maxPoints;
      const pointLength = element.attributes.position.points.length;

      if (pointLength < pointAmount) {
        dispatch({
          type: APPEND_POINT_TO_ELEMENT,
          payload: { id, point: newPoint },
        });
      } else {
        dispatch({
          type: SET_MODE_EDIT,
        });
      }
    } else {
      dispatch({
        type: SET_MODE_EDIT,
      });
    }
  };

export const drawingElement =
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    dispatch({
      type: REDRAW_LAST_POINT,
      payload: { id, point: newPoint },
      passHistrory: true,
    });
  };

export const endDrawingElement = (id: number) => (dispatch: Function) => {
  dispatch({
    type: DELETE_LAST_POINT_OF_ELEMENT,
    payload: { id },
    passHistrory: true,
  });

  dispatch({
    type: SET_MODE_EDIT,
  });
};

export const undo = () => (dispatch: Function) => {
  dispatch({
    type: UNDO,
  });
};

export const redo = () => (dispatch: Function) => {
  dispatch({
    type: REDO,
  });
};

export const changeAttributes =
  (changes: IChangesData) => (dispatch: Function) => {
    dispatch({
      type: CHANGE_ATTRIBUTES,
      payload: { ...changes },
    });
  };

export const pasteElements = () => (dispatch: Function, getState: Function) => {
  const elements = selectCopyPasteBuffer(getState());
  dispatch({
    type: PASTE_ELEMENTS,
    payload: { elements },
  });
};
