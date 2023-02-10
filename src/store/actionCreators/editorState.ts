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
} from "../actionTypes/editorState";
import { elementsDefaultStates } from "../../constants/mimicBaseElements";
import { ElementType, IMimicElement, IPoint } from "../../models/Editor";
import { selectEditorElements } from "../selectors/editorElements";
import {
  selectSelectedElements,
  selectSelectionArea,
  selectCanvasRectPosition,
  selectEditorOperations,
} from "../selectors/editorState";
import { correctPoint } from "./editorElements";
import { getAreaPointsByHWP } from "../../utils/editor/getAreaPointsByHWP";
import rotateElementPoints from "../../utils/editor/rotateElementPoints";
import checkIsPointInArea from "../../utils/editor/checkIsPointInArea";
import { ELEMENT_TYPE_GROUP } from "../../constants/literals";

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
  (clientX: number, clientY: number) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
    const elements = selectEditorElements(getState());
    const { selector } = selectSelectionArea(getState());

    const endPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);

    const selected = [];
    const area: [IPoint, IPoint] = [selector.begin, endPoint];

    // TODO MOVE LOGIC TO UTILS
    for (let i = 0; i < elements.length; i++) {
      const element: IMimicElement = elements[i];
      const { width, height, angle, points } = element.attributes.position;

      let tempPoints = [...points];

      let innerPoints = 0;

      if (width && height !== undefined && points.length === 1) {
        const center = {
          x: tempPoints[0].x + width / 2,
          y: tempPoints[0].y + height / 2,
        };
        tempPoints = rotateElementPoints(
          center,
          getAreaPointsByHWP(width, height, tempPoints[0]),
          angle | 0
        );
      }

      for (let j = 0; j < tempPoints.length; j++) {
        const point = tempPoints[j];

        if (checkIsPointInArea(area, point)) {
          innerPoints++;
        }
      }

      if (innerPoints === tempPoints.length) {
        selected.push(element.attributes.general.id);
      }
    }

    dispatch({ type: SET_SELECTED_ELEMENTS, payload: { selected } });
    dispatch(updateAvailableOperations());
  };

export const updateAvailableOperations =
  () => (dispatch: Function, getState: Function) => {
    const elements = selectEditorElements(getState());
    const selected = selectSelectedElements(getState());
    const operationsState = selectEditorOperations(getState());
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
    const elements = selectEditorElements(getState());
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
  (clientX: number, clientY: number, reset = false) =>
  (dispatch: Function, getState: Function) => {
    const viewPosition = selectCanvasRectPosition(getState());
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
