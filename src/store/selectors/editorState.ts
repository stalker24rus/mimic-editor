import { ReduxState } from "../index";

export const selectEditorMode = (state: ReduxState) => state.editorState.mode;

export const selectCanvasRectPosition = (state: ReduxState) =>
  state.editorState.canvasRectPosition;

export const selectEditorAccessibleOperations = (state: ReduxState) =>
  state.editorState.operations;

export const selectSelectionDisabled = (state: ReduxState) =>
  !state.editorState.operations.canSelectElements;

//FIXME
export const selectNewElement = (state: ReduxState) =>
  state.editorState.newElement;

export const selectCopyPasteBuffer = (state: ReduxState) =>
  state.editorState.copyPasteBuffer;

export const selectCreatedElementId = (state: ReduxState) =>
  state.editorState.createdElementId;

export const selectSelectionArea = (state: ReduxState) =>
  state.editorState.selectionArea;

export const selectSelectedElements = (state: ReduxState) =>
  state.editorState.selected;
