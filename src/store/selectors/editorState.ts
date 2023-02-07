import { ReduxState } from "../index";

export const selectViewPosition = (state: ReduxState) =>
  state.editorState.viewPosition;

export const selectSelectionDisabled = (state: ReduxState) =>
  state.editorState.selectionDisabled;

// FIXME проверить тип editorState.selectSelectorRect
export const selectSelectorRect = (state: any) =>
  state.editorState.selectSelectorRect;

// FIXME проверить тип editorState
export const selectNewElement = (state: any) => state.editorState.newElement;

export const selectLastTakenId = (state: ReduxState) =>
  state.editorState.lastTakenId;

export const selectSelectedElements = (state: ReduxState) =>
  state.editorState.selected;

export const selectCopyPasteBuffer = (state: ReduxState) =>
  state.editorState.copyPasteBuffer;

export const selectEditorMode = (state: ReduxState) => state.editorState.mode;

export const selectEditorOperations = (state: ReduxState) =>
  state.editorState.operations;

export const selectEditorDrawId = (state: ReduxState) =>
  state.editorState.drawId;

export const selectSelectionArea = (state: ReduxState) =>
  state.editorState.selectionArea;
