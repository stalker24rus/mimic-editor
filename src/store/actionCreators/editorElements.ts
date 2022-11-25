import {
  CHANGE_ELEMENT_ANGLE,
  MOVE_ELEMENT,
  RESIZE_ELEMENT,
} from "../../constants/actionTypes/editorElements";
import { PointFromat } from "../../models/Editor";

const selectViewPosition = (state: any) => state.editorState.viewPosition;

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
