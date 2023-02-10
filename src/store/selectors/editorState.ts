import { ReduxState } from "../index";

export const selectCanvasRectPosition = (state: ReduxState) =>
  state.editorState.canvasRectPosition;

export const selectSelectionDisabled = (state: ReduxState) =>
  !state.editorState.operations.canSelectElements;

// FIXME проверить тип editorState.selectSelectorRect
export const selectSelectorRect = (state: any) =>
  state.editorState.selectSelectorRect;

// FIXME проверить тип editorState
export const selectNewElement = (state: any) => state.editorState.newElement;

export const selectSelectedElements = (state: ReduxState) =>
  state.editorState.selected;

export const selectCopyPasteBuffer = (state: ReduxState) =>
  state.editorState.copyPasteBuffer;

export const selectEditorMode = (state: ReduxState) => state.editorState.mode;

export const selectEditorOperations = (state: ReduxState) =>
  state.editorState.operations;

export const selectCreatedElementId = (state: ReduxState) =>
  state.editorState.createdElementId;

export const selectSelectionArea = (state: ReduxState) =>
  state.editorState.selectionArea;
