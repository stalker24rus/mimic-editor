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
} from "../../constants/actionTypes/editorElements";
import {
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_EDIT,
} from "../../constants/actionTypes/editorState";
import { REDO, UNDO } from "../../constants/actionTypes/undoRedo";
import { MimicElementProps, PointFromat } from "../../models/Editor";

export const selectViewPosition = (state: any) =>
  state.editorState.viewPosition;
const selectNewElement = (state: any) => state.editorState.newElement;
const selectLastTakenId = (state: any) => state.editorState.lastTakenId;
const selectElement = (state: any, id: number) =>
  state.undoredobleEditorElements.present.find(
    (element: MimicElementProps) => element.attributes.general.id === id
  );
const selectElementPointsLength = (element: MimicElementProps) =>
  element.attributes.position.points.length;

function correctPoint(
  point: PointFromat,
  correction: PointFromat
): PointFromat {
  return {
    x: point.x - correction.x,
    y: point.y - correction.y,
  };
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

/**
 * DRAWING
 */

export const startDoingChanges = () => (dispatch: Function) => {
  dispatch({
    type: HISTORY_POINT_FOR_CHANGES,
    passHistrory: false,
  });
};

export const createElement =
  (point: PointFromat) => (dispatch: Function, getState: Function) => {
    const newLastTakenId = selectLastTakenId(getState()) + 1;

    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    const newElement = selectNewElement(getState());

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

    if (newElement.service.pointsAmount <= 1) {
      dispatch({
        type: SET_MODE_EDIT,
      });
    }
  };

export const appendPointToElement =
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = correctPoint(point, viewPosition);
    console.log(getState());
    const element = selectElement(getState(), id);

    if (element) {
      const pointAmount = element.service.pointsAmount;
      const pointLength = element.attributes.position.points.length;
      console.log(pointLength, pointAmount);
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
