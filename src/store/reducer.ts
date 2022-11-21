import editorElements from "./reducers/editorElements";
import editorState from "./reducers/editorState";
import simulatorState from "./reducers/simulatorState";
import tagStore from "./reducers/tagStore";
import undoRedo from "./reducers/undoRedo";

const undoredobleEditorElements = undoRedo(editorElements);

export const rootReducers = {
  undoredobleEditorElements,
  editorState,
  simulatorState,
  tagStore,
};
