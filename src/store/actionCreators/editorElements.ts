import {
  CHANGE_ELEMENT_ANGLE,
  MOVE_ELEMENT,
  RESIZE_ELEMENT,
} from "../../constants/actionTypes/editorElements";

const selectViewPosition = (state: any) => state.editorState.viewPosition;

export const changeElementAngle =
  (id, point) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    dispatch({ type: CHANGE_ELEMENT_ANGLE, payload: { id, point } });
  };

export const moveElement =
  (id, point) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    dispatch({ type: MOVE_ELEMENT, payload: { id, point } });
  };

export const resizeElement =
  (id, point) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    dispatch({ type: RESIZE_ELEMENT, payload: { id, point } });
  };
