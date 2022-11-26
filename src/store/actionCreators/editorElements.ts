import {
  CHANGE_ELEMENT_ANGLE,
  CREATE_ELEMENT,
  MOVE_ELEMENT,
  RESIZE_ELEMENT,
} from "../../constants/actionTypes/editorElements";
import { PointFromat } from "../../models/Editor";

const selectViewPosition = (state: any) => state.editorState.viewPosition;
const selectNewElement = (state: any) => state.editorState.newElement;

export const changeElementAngle =
  (id: number, point: PointFromat) => (dispatch: Function) => {
    dispatch({ type: CHANGE_ELEMENT_ANGLE, payload: { id, point } });
  };

export const moveElement =
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: MOVE_ELEMENT,
      payload: { id, point: newPoint },
    });
  };

export const resizeElement =
  (id: number, pointName: string, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: RESIZE_ELEMENT,
      payload: { id, pointName, point: newPoint },
    });
  };

// 888888888888888888888888888888888888888888888888888888888888888888888888
// FIXME

export const createElement =
  (id: number, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newElement = selectNewElement(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: CREATE_ELEMENT,
      payload: { id, newElement, point: newPoint },
    });
  };

export const appendPointToElement =
  (id: number, pointName: string, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: RESIZE_ELEMENT,
      payload: { id, pointName, point: newPoint },
    });
  };

export const drawingElement =
  (id: number, pointName: string, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: RESIZE_ELEMENT,
      payload: { id, pointName, point: newPoint },
    });
  };

export const endDrawingElement =
  (id: number, pointName: string, point: PointFromat) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const newPoint = {
      x: point.x - viewPosition.x,
      y: point.y - viewPosition.y,
    };
    dispatch({
      type: RESIZE_ELEMENT,
      payload: { id, pointName, point: newPoint },
    });
  };
