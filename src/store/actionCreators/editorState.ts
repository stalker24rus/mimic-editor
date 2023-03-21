import useGetBoxByMultiPoints from "../../hooks/useGetBoxByMultiPoints";
import {
  COPY_SELECTED_ELEMENTS_TO_BUFFER,
  ABORT_SELECTION,
  SET_CREATION_MODE,
  SET_SELECTED_ELEMENTS,
  SET_SELECTION_AREA,
  SET_SELECTION_AREA_VISIBLE,
  SET_CANVAS_RECT_POSITION,
  ADD_ELEMENT_TO_SELECTION,
  UPDATE_AVAILABLE_OPERATIONS,
  SET_PREVIEW_MODE,
  SET_EDIT_MODE,
  OPEN_SCRIPT_FILE,
  SAVE_SCRIPT_FILE,
  CLOSE_SCRIPT_FILE,
} from "../actionTypes/editorState";
import { elementsDefaultStates } from "../../constants/mimicBaseElements";
import { ElementType, IMimicElement, IPoint } from "../../models/Editor";
import { selectMimicElements } from "../selectors/editableMimic";
import {
  selectSelectedElements,
  selectSelectionArea,
  selectCanvasRectPosition,
  selectEditorAccessibleOperations,
} from "../selectors/editorState";

import { ELEMENT_TYPE_GROUP } from "../../constants/literals";
import getSelectedElementsFromArea from "../../utils/EditorState/getSelectedElementsFromArea";
import correctPoint from "../../utils/editor/correctPoint";

export const setEditorModeEdit = () => (dispatch: Function) => {
  dispatch({ type: SET_EDIT_MODE });
};

export const setEditorModePreview = () => (dispatch: Function) => {
  dispatch({ type: SET_PREVIEW_MODE });
};

export const editorAddElement = (type: ElementType) => (dispatch: Function) => {
  const element = {
    type,
    ...elementsDefaultStates[type],
  };
  dispatch({ type: SET_CREATION_MODE, payload: { element } });
};

export const setCanvasRectPosition = (point: IPoint) => (dispatch: Function) =>
  dispatch({ type: SET_CANVAS_RECT_POSITION, payload: { point } });

export const setSelectedElements =
  (selected: number[]) => (dispatch: Function) => {
    dispatch({ type: SET_SELECTED_ELEMENTS, payload: { selected } });

    // TODO add check isSelectedGroup and dispatch operations;
  };

export const selectElementsFromSelectionAria =
  (x: number, y: number) => (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const elements = selectMimicElements(getState());
    const { selector } = selectSelectionArea(getState());

    const endPoint = correctPoint({ x, y }, viewPosition);
    const area: [IPoint, IPoint] = [selector.begin, endPoint];

    const selected = getSelectedElementsFromArea(elements, area);

    dispatch({ type: SET_SELECTED_ELEMENTS, payload: { selected } });
    dispatch(updateAvailableOperations());
  };

export const updateAvailableOperations =
  () => (dispatch: Function, getState: Function) => {
    const elements = selectMimicElements(getState());
    const selected = selectSelectedElements(getState());
    const operationsState = selectEditorAccessibleOperations(getState());
    let isSelectedGroup = false;

    for (let i = 0; i < elements.length; i++) {
      const element: IMimicElement = elements[i];
      if (
        element.attributes.general.id === selected[0] &&
        element.type === ELEMENT_TYPE_GROUP
      ) {
        isSelectedGroup = true;
      }
    }

    const operations = {
      ...operationsState,
      canGroup: selected.length > 1 && !isSelectedGroup,
      canUnGroup: isSelectedGroup,
      canMoveOnTop: selected.length > 0,
      canMoveOnForward: selected.length === 1,
      canMoveOnBottom: selected.length > 0,
      canMoveOnBack: selected.length === 1,
      canCopy: selected.length > 0,
      canDelete: selected.length > 0,
    };
    dispatch({ type: UPDATE_AVAILABLE_OPERATIONS, payload: { operations } });
  };

export const addElementToSelection = (id: number) => (dispatch: Function) => {
  dispatch({ type: ADD_ELEMENT_TO_SELECTION, payload: { id } });
};

export const abortSelection = () => (dispatch: Function) => {
  dispatch({ type: ABORT_SELECTION });
};

export const copySelectedElementsToBuffer =
  () => (dispatch: Function, getState: Function) => {
    const elements = selectMimicElements(getState());
    const selected = selectSelectedElements(getState());
    dispatch({
      type: COPY_SELECTED_ELEMENTS_TO_BUFFER,
      payload: {
        elements,
        selected,
      },
    });
  };

export const setSelectionArea =
  (x: number, y: number, reset = false) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const { selector } = selectSelectionArea(getState());
    const [getBox] = useGetBoxByMultiPoints(); // FIXME

    let startPoint: IPoint = { x: 0, y: 0 };
    let endPoint: IPoint = { x: 0, y: 0 };

    if (reset) {
      startPoint = correctPoint({ x, y }, viewPosition);
      endPoint = { ...startPoint };
    } else {
      startPoint = selector.begin;
      endPoint = correctPoint({ x, y }, viewPosition);
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

// export const openScriptFile =
//   (elementId: number | string) => (dispatch: Function) => {
//     dispatch({ type: OPEN_SCRIPT_FILE, payload: { elementId } });
//   };

// export const saveScriptFile =
//   (elementId: number | string) => (dispatch: Function) => {
//     dispatch({ type: SAVE_SCRIPT_FILE, payload: { elementId } });
//   };

// export const closeScriptFile =
//   (elementId: number | string) => (dispatch: Function) => {
//     dispatch({ type: CLOSE_SCRIPT_FILE, payload: { elementId } });
//   };
