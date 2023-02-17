import editableMimicReduser from "./reducers/editableMimic";
import editorState from "./reducers/editorState";
import simulatorState from "./reducers/simulatorState";
import tagStore from "./reducers/tagStore";
import editorHistory from "./reducers/editorHistory";

const editableMimic = editorHistory(editableMimicReduser);

export const rootReducers = {
  editableMimic,
  editorState,
  simulatorState,
  tagStore,
};
