import { EDITOR_MODE_CREATE, MIMIC } from "../../constants/literals";
import { IPoint } from "../../models/Editor";
import {
  selectCreatedElementId,
  selectEditorMode,
  selectSelectionDisabled,
} from "../selectors/editorState";
import {
  appendPointToElement,
  createElement,
  drawingElement,
  endDrawingElement,
} from "./editorElements";
import {
  setSelectedElements,
  selectElementsFromSelectionAria,
  setSelectionArea,
  setSelectionAreaVisible,
  addElementToSelection,
} from "./editorState";

import { selectSelectionArea } from "../selectors/editorState";

export const onCanvasPointerClick =
  (ev: React.PointerEvent<HTMLDivElement>) =>
  (dispatch: Function, getState: Function) => {
    const mode = selectEditorMode(getState());
    const createdElementId = selectCreatedElementId(getState());

    // TODO Optimization and refactoring

    // ------------------------------------------------------------
    const { clientX, clientY } = ev;
    const elements = document.elementsFromPoint(clientX, clientY);

    if (ev.shiftKey) {
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          dispatch(addElementToSelection(parseInt(id)));
          break;
        }
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          dispatch(setSelectedElements([parseInt(id)]));
          break;
        }
      }
    }

    //-------------------------------------------------------------
    const { detail } = ev;
    switch (detail) {
      case 1: {
        if (mode !== EDITOR_MODE_CREATE) return;
        const { clientX, clientY } = ev;
        const point: IPoint = {
          x: clientX,
          y: clientY,
        };

        if (!createdElementId) {
          dispatch(createElement(point));
        } else {
          dispatch(appendPointToElement(createdElementId, point));
        }
        break;
      }

      case 2: {
        if (!createdElementId || mode !== EDITOR_MODE_CREATE) return;
        dispatch(endDrawingElement(createdElementId));
        break;
      }
      default: {
        break;
      }
    }
  };

export const onCanvasPointerDown =
  (ev: any) => (dispatch: Function, getState: Function) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);
    dispatch(setSelectionAreaVisible(true));
    dispatch(setSelectionArea(clientX, clientY, true));
  };

export const onCanvasPointerMove =
  (ev: React.PointerEvent<HTMLDivElement>) =>
  (dispatch: Function, getState: Function) => {
    const createdElementId = selectCreatedElementId(getState());

    if (createdElementId) {
      const { clientX, clientY } = ev;
      const point: IPoint = {
        x: clientX,
        y: clientY,
      };
      dispatch(drawingElement(createdElementId, point));
      return;
    }

    const selectionDisabled = selectSelectionDisabled(getState());
    const { visible } = selectSelectionArea(getState());

    if (visible && !selectionDisabled) {
      const { clientX, clientY } = ev;
      dispatch(selectElementsFromSelectionAria(clientX, clientY));
      dispatch(setSelectionArea(clientX, clientY));
      return;
    }
  };

export const onCanvasPointerUp =
  (ev: React.PointerEvent<HTMLDivElement>) =>
  (dispatch: Function, getState: Function) => {
    dispatch(setSelectionAreaVisible(false));
  };
