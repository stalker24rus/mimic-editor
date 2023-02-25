import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../../../../../store";
import {
  selectEditorAccessibleOperations,
  selectSelectedElements,
} from "../../../../../../store/selectors/editorState";
import Menu from "../../../../../../ui/Menu";
import { IMenuObject } from "../../../../../../ui/Menu/Menu";

export default function MenuMode() {
  const dispatch = useTypedDispatch();
  const selected = useSelector(selectSelectedElements);
  const operations = useSelector(selectEditorAccessibleOperations);

  const menuElements: IMenuObject[] = useMemo(
    () => [
      {
        text: "Редактор",
        handler: () => alert("Заглушка для режима редактора"),
        isDisabled: false,
      },
      {
        text: "Просмотр",
        handler: () => alert("Заглушка для режима просмотра"),
        isDisabled: false,
      },
    ],
    [dispatch, operations]
  );

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Menu text="Режим" menu={menuElements} />
    </div>
  );
}
