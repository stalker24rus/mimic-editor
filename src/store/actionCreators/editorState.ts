import {
  COPY_ELEMENTS,
  HANDLE_ESCAPE,
  SELECT_ELEMENTS,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_CREATE,
  SET_SELECTED_ELEMENTS,
  SET_VIEW_POSITION,
  TOGGLE_ELEMENT_SELECTION,
} from "../actionTypes/editorState";
import { elementsDefaultStates } from "../../constants/mimicBaseElements";
import { ElementType, IPoint } from "../../models/Editor";
import { selectEditorElements } from "../selectors/editorElements";
import { selectSelectedElements } from "../selectors/editorState";

export const editorAddElement = (type: ElementType) => (dispatch: Function) => {
  const element = {
    type,
    ...elementsDefaultStates[type],
  };
  dispatch({ type: SET_MODE_CREATE, payload: { element } });
};

export const editorSetDrawId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_DRAWING_ID, payload: { id } });
};

export const editorSetLastTakenId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_LAST_TAKEN_ID, payload: { id } });
};

export const setViewPosition = (point: IPoint) => (dispatch: Function) => {
  dispatch({ type: SET_VIEW_POSITION, payload: { point } });
};

export const selectElement =
  (selected: number[]) => (dispatch: Function, getState: Function) => {
    const elements = selectEditorElements(getState());
    dispatch({ type: SET_SELECTED_ELEMENTS, payload: { selected, elements } });
  };

export const selectElements =
  (area: [IPoint, IPoint]) => (dispatch: Function, getState: Function) => {
    const elements = selectEditorElements(getState());

    dispatch({
      type: SELECT_ELEMENTS,
      payload: { area, elements },
    });
  };

// export const addElementToSelectionList =
//   (id: number) => (dispatch: Function) => {
//     dispatch({ type: ADD_ELEMENT_TO_SELECTION_LIST, payload: { id } });
//   };

// export const delFromSelectionList = (id: number) => (dispatch: Function) => {
//   dispatch({ type: DEL_ELEMENT_FROM_SELECTION_LIST, payload: { id } });
// };

export const toggleElementSelection = (id: number) => (dispatch: Function) => {
  dispatch({ type: TOGGLE_ELEMENT_SELECTION, payload: { id } });
};

export const escapeElements = () => (dispatch: Function) => {
  dispatch({ type: HANDLE_ESCAPE });
};

export const copyElements = () => (dispatch: Function, getState: Function) => {
  const elements = selectEditorElements(getState());
  const selected = selectSelectedElements(getState());
  dispatch({
    type: COPY_ELEMENTS,
    payload: {
      elements,
      selected,
    },
  });
};
