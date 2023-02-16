import editableMimic from "./reducers/editableMimic";
import editorState from "./reducers/editorState";
import simulatorState from "./reducers/simulatorState";
import tagStore from "./reducers/tagStore";
import editorHistory from "./reducers/editorHistory";

const undoredobleEditorElements = editorHistory(editableMimic);

export const rootReducers = {
  undoredobleEditorElements,
  editorState,
  simulatorState,
  tagStore,
};
