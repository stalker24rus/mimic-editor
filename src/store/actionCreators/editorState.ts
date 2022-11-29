import {
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_CREATE,
  SET_SELECTED_ELEMENTS,
  SET_VIEW_POSITION,
} from "../../constants/actionTypes/editorState";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../constants/literals";
import {
  getBaseParamOfButton,
  getBaseParamOfLine,
  getBaseParamOfPolygon,
  getBaseParamOfPolyLine,
} from "../../constants/mimicBaseElements";
import { PointFromat } from "../../models/Editor";

export const editorAddButton = () => (dispatch: Function) => {
  const element = {
    type: ELEMENT_TYPE_BUTTON,
    ...getBaseParamOfButton(),
  };
  dispatch({ type: SET_MODE_CREATE, payload: { element } });
};

export const editorAddLine = () => (dispatch: Function) => {
  const element = {
    type: ELEMENT_TYPE_LINE,
    ...getBaseParamOfLine(),
  };
  dispatch({ type: SET_MODE_CREATE, payload: { element } });
};

export const editorAddPolyline = () => (dispatch: Function) => {
  const element = {
    type: ELEMENT_TYPE_POLYLINE,
    ...getBaseParamOfPolyLine(),
  };
  dispatch({ type: SET_MODE_CREATE, payload: { element } });
};

export const editorAddPolygon = () => (dispatch: Function) => {
  const element = {
    type: ELEMENT_TYPE_POLYGON,
    ...getBaseParamOfPolygon(),
  };
  dispatch({ type: SET_MODE_CREATE, payload: { element } });
};

export const editorSetDrawId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_DRAWING_ID, payload: { id } });
};

export const editorSetLastTakenId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_LAST_TAKEN_ID, payload: { id } });
};

export const setViewPosition = (point: PointFromat) => (dispatch: Function) => {
  dispatch({ type: SET_VIEW_POSITION, payload: { point } });
};

export const selectElement = (elements: number[]) => (dispatch: Function) => {
  dispatch({ type: SET_SELECTED_ELEMENTS, payload: { elements } });
};
