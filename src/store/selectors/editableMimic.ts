import { ReduxState } from "..";
import { IMimicElement } from "../../models/Editor";

export const selectMimic = (state: ReduxState) => state.editableMimic.present;

export const selectMimicElement = (state: ReduxState, id: number) =>
  state.editableMimic.present.children.find(
    (element: IMimicElement) => element.attributes.general.id === id
  );

export const selectMimicAttributes = (state: ReduxState) =>
  state.editableMimic.present.attributes;

export const selectMimicElements = (state: ReduxState) =>
  state.editableMimic.present.children;

export const selectEditorElementsPast = (state: ReduxState) =>
  state.editableMimic.past;

export const selectEditorElementsFuture = (state: ReduxState) =>
  state.editableMimic.future;
