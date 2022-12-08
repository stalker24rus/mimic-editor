export const selectViewPosition = (state: any) =>
  state.editorState.viewPosition;
export const selectNewElement = (state: any) => state.editorState.newElement;
export const selectLastTakenId = (state: any) => state.editorState.lastTakenId;
export const selectSelectedElements = (state: any) =>
  state.editorState.selected;
