import { ReduxState } from "..";
import { IMimicElement } from "../../models/Editor";

export const selectMimic = (state: ReduxState) =>
  state.undoredobleEditorElements.present;

export const selectMimicElement = (state: ReduxState, id: number) =>
  state.undoredobleEditorElements.present.children.find(
    (element: IMimicElement) => element.attributes.general.id === id
  );

export const selectMimicAttributes = (state: ReduxState) =>
  state.undoredobleEditorElements.present.attributes;

export const selectMimicElements = (state: ReduxState) =>
  state.undoredobleEditorElements.present.children;

export const selectEditorElementsPast = (state: ReduxState) =>
  state.undoredobleEditorElements.past;

export const selectEditorElementsFuture = (state: ReduxState) =>
  state.undoredobleEditorElements.future;
