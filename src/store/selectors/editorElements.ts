import { MimicElementProps } from "../../models/Editor";

export const selectElement = (state: any, id: number) =>
  state.undoredobleEditorElements.present.children.find(
    (element: MimicElementProps) => element.attributes.general.id === id
  );

export const selectMimic = (state: any) =>
  state.undoredobleEditorElements.present;

export const selectMimicAttributes = (state: any) =>
  state.undoredobleEditorElements.present.attributes;

export const selectEditorElements = (state: any) =>
  state.undoredobleEditorElements.present.children;

export const selectEditorElementsPast = (state: any) =>
  state.undoredobleEditorElements.past;

export const selectEditorElementsFuture = (state: any) =>
  state.undoredobleEditorElements.future;
