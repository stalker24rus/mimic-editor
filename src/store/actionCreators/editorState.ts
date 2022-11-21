import { SET_MODE_CREATE } from "../../constants/actionTypes/editorState";
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

export const editorAddButton = () => (dispatch: Function) => {
  console.log(dispatch);
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
