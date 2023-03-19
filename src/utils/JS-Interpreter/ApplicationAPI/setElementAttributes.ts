import { store } from "../../../store";
import { apiChangeElementAttributes } from "../../../store/actionCreators/editorElements";

export default function (name, propFamily, propName, value) {
  store.dispatch(
    apiChangeElementAttributes({
      name,
      propFamily,
      propName,
      value,
    })
  );
}
