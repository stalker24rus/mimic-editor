import { MimicElementProps } from "../../models/Editor";

export const selectElement = (state: any, id: number) =>
  state.undoredobleEditorElements.present.find(
    (element: MimicElementProps) => element.attributes.general.id === id
  );
