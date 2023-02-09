import useGetBoxByMultiPoints from "../../hooks/useGetBoxByMultiPoints";
import {
  COPY_ELEMENTS,
  REMOVE_SELECTION,
  SELECT_ELEMENTS,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_CREATION_MODE,
  SET_SELECTED_ELEMENTS,
  SET_SELECTION_AREA,
  SET_SELECTION_AREA_VISIBLE,
  SET_VIEW_POSITION,
  TOGGLE_ELEMENT_SELECTION,
} from "../actionTypes/editorState";
import { elementsDefaultStates } from "../../constants/mimicBaseElements";
import { ElementType, IPoint } from "../../models/Editor";
import { selectEditorElements } from "../selectors/editorElements";
import {
  selectSelectedElements,
  selectSelectionArea,
  selectViewPosition,
} from "../selectors/editorState";
import { correctPoint } from "./editorElements";

export const editorAddElement = (type: ElementType) => (dispatch: Function) => {
  const element = {
    type,
    ...elementsDefaultStates[type],
  };
  dispatch({ type: SET_CREATION_MODE, payload: { element } });
};

export const editorSetDrawId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_DRAWING_ID, payload: { id } });
};

export const editorSetLastTakenId = (id: number) => (dispatch: Function) => {
  dispatch({ type: SET_LAST_TAKEN_ID, payload: { id } });
};

export const setViewPosition = (point: IPoint) => (dispatch: Function) =>
  dispatch({ type: SET_VIEW_POSITION, payload: { point } });

export const selectElement =
  (selected: number[]) => (dispatch: Function, getState: Function) => {
    const elements = selectEditorElements(getState());
    dispatch({ type: SET_SELECTED_ELEMENTS, payload: { selected, elements } });
  };

export const selectElements =
  (clientX: number, clientY: number) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const elements = selectEditorElements(getState());
    const { selector } = selectSelectionArea(getState());

    const endPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);

    dispatch({
      type: SELECT_ELEMENTS,
      payload: { area: [selector.begin, endPoint], elements },
    });
  };

export const toggleElementSelection = (id: number) => (dispatch: Function) => {
  dispatch({ type: TOGGLE_ELEMENT_SELECTION, payload: { id } });
};

export const removeSelection = () => (dispatch: Function) => {
  dispatch({ type: REMOVE_SELECTION });
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

export const setSelectionArea =
  (clientX: number, clientY: number, reset = false) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectViewPosition(getState());
    const { selector } = selectSelectionArea(getState());
    const [getBox] = useGetBoxByMultiPoints(); // FIXME

    let startPoint: IPoint = { x: 0, y: 0 };
    let endPoint: IPoint = { x: 0, y: 0 };

    if (reset) {
      startPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);
      endPoint = { ...startPoint };
    } else {
      startPoint = selector.begin;
      endPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);
    }

    const [top, left, width, height] = getBox([startPoint, endPoint]);

    dispatch({
      type: SET_SELECTION_AREA,
      payload: {
        selector: {
          begin: startPoint,
          end: endPoint,
        },
        position: {
          top: top | 0,
          left: left | 0,
          width: width | 0,
          height: height | 0,
        },
      },
    });
  };

export const setSelectionAreaVisible =
  (visible: boolean) => (dispatch: Function) => {
    dispatch({ type: SET_SELECTION_AREA_VISIBLE, payload: { visible } });
  };
