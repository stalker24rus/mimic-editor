import { selectMimicElementByName } from "../../../store/selectors/editableMimic";
import { store } from "../../../store";

export default function (elementName) {
  const state = store.getState();

  return selectMimicElementByName(state, elementName)?.attributes || {};
}
