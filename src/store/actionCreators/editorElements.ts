import {
  APPEND_POINT_TO_ELEMENT,
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  DELETE_LAST_POINT_OF_ELEMENT,
  // MOVE_ELEMENT,
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
  ELEMENTS_LEFT_ALIGN,
  ELEMENTS_HORIZON_ALIGN,
  ELEMENTS_RIGHT_ALIGN,
  ELEMENTS_TOP_ALIGN,
  ELEMENTS_VERTICAL_ALIGN,
  ELEMENTS_BOTTOM_ALIGN,
  GROUP_ELEMENTS,
  UNGROUP_ELEMENTS,
} from "../actionTypes/editorElements";
import {
  DISABLE_SELECTION,
  // DISABLE_TOUCH,
  ENABLE_SELECTION,
  // ENABLE_TOUCH,
  PASTE_ELEMENTS,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_EDIT,
} from "../actionTypes/editorState";
import { REDO, UNDO } from "../actionTypes/undoRedo";
import { IChangesData, IMimicElement, IPoint } from "../../models/Editor";
import {
  selectCopyPasteBuffer,
  selectNewElement,
  selectSelectedElements,
  selectViewPosition,
} from "../selectors/editorState";
import { selectMimic } from "../selectors/editorElements";
import { selectElement } from "../selectors/editorElements";
import { ElementBase } from "../../components/Hooks/useDrawElement";
import getLastGID from "../reducers/logic/editorElements/crud/getLastGID";

// TODO ??? detach to other file
export function correctPoint(point: IPoint, correction: IPoint): IPoint {
  return {
    x: point.x - correction.x,
    y: point.y - correction.y,
  };
}

export const changeElementAngle =
  (id: number, point: IPoint) => (dispatch: Function) => {
    dispatch({
      type: CHANGE_ELEMENT_ANGLE,
      payload: { id, point },
      passHistrory: true,
    });
  };

// export const moveElement =
//   (id: number, point: PointFromat) =>
//   (dispatch: Function, getState: Function) => {
//     dispatch({
//       type: MOVE_ELEMENT,
//       payload: { id, point },
//       passHistrory: true,
//     });
//   };

export const resizeElement =
  (id: number, pointName: string, point: IPoint) =>
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
  (id: number, pointNo: number, point: IPoint) =>
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
  // dispatch({
  //   type: DISABLE_TOUCH,
  // });
};

export const endDoingChanges = () => (dispatch: Function) => {
  dispatch({
    type: ENABLE_SELECTION,
    passHistrory: false,
  });
  // dispatch({
  //   type: ENABLE_TOUCH,
  // });
};

export const createElement =
  (point: IPoint) => (dispatch: Function, getState: Function) => {
    // ADD FUNCTION FOR GET A new ID
    const root: IMimicElement = selectMimic(getState());
    const newLastTakenId = getLastGID(root.attributes.general.id, root) + 1;

    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    const newElement: IMimicElement = selectNewElement(getState());

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
  (id: number, point: IPoint) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);

    const element: IMimicElement = selectElement(getState(), id);

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
  (id: number, point: IPoint) => (dispatch: Function, getState: Function) => {
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

export const setElementsLeftAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_LEFT_ALIGN,
      payload: { selected },
    });
  };

export const setElementsHorizonAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_HORIZON_ALIGN,
      payload: { selected },
    });
  };

export const setElementsRightAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_RIGHT_ALIGN,
      payload: { selected },
    });
  };

export const setElementsTopAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_TOP_ALIGN,
      payload: { selected },
    });
  };

export const setElementsVerticalAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_VERTICAL_ALIGN,
      payload: { selected },
    });
  };

export const setElementsBottomAlign =
  () => (dispatch: Function, getState: Function) => {
    const selected = selectSelectedElements(getState());
    dispatch({
      type: ELEMENTS_BOTTOM_ALIGN,
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
