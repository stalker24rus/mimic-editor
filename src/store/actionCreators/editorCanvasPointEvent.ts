import { EDITOR_MODE_CREATE, MIMIC } from "../../constants/literals";
import { IPoint } from "../../models/Editor";
import {
  selectEditorDrawId,
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
  selectElements,
  setSelectionArea,
  setSelectionAreaVisible,
  addElementToSelection,
} from "./editorState";

import { selectSelectionArea } from "../selectors/editorState";

export const onCanvasPointerClick =
  (ev: React.PointerEvent<HTMLDivElement>) =>
  (dispatch: Function, getState: Function) => {
    const mode = selectEditorMode(getState());
    const drawId = selectEditorDrawId(getState());

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

        if (!drawId) {
          dispatch(createElement(point));
        } else {
          dispatch(appendPointToElement(drawId, point));
        }
        break;
      }

      case 2: {
        if (!drawId || mode !== EDITOR_MODE_CREATE) return;
        dispatch(endDrawingElement(drawId));
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
    const drawId = selectEditorDrawId(getState());

    if (drawId) {
      const { clientX, clientY } = ev;
      const point: IPoint = {
        x: clientX,
        y: clientY,
      };
      dispatch(drawingElement(drawId, point));
      return;
    }

    const selectionDisabled = selectSelectionDisabled(getState());
    const { visible } = selectSelectionArea(getState());

    if (visible && !selectionDisabled) {
      const { clientX, clientY } = ev;
      dispatch(selectElements(clientX, clientY));
      dispatch(setSelectionArea(clientX, clientY));
      return;
    }
  };

export const onCanvasPointerUp =
  (ev: React.PointerEvent<HTMLDivElement>) =>
  (dispatch: Function, getState: Function) => {
    dispatch(setSelectionAreaVisible(false));
  };
