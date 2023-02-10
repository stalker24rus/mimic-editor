import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxState, useTypedDispatch } from "../../../../../../store";
import {
  deleteSelectedElements,
  undo,
  redo,
  pasteElementsFromBuffer,
} from "../../../../../../store/actionCreators/editorElements";
import {
  copySelectedElementsToBuffer,
  abortSelection,
} from "../../../../../../store/actionCreators/editorState";
import {
  selectCopyPasteBuffer,
  selectSelectedElements,
} from "../../../../../../store/selectors/editorState";
import Menu, { IMenuObject } from "../../../../../../ui/Menu/Menu";

export default function MenuEdit() {
  const dispatch = useTypedDispatch();

  const selected = useSelector(selectSelectedElements);
  const future = useSelector(
    (store: ReduxState) => store.undoredobleEditorElements.future
  );
  const past = useSelector(
    (store: ReduxState) => store.undoredobleEditorElements.past
  );
  const copyPasteBuffer = useSelector(selectCopyPasteBuffer);

  const menuElements: IMenuObject[] = useMemo(
    () => [
      {
        text: "Удалить",
        handler: () => dispatch(deleteSelectedElements()),
        isDisabled: selected.length === 0,
      },
      {
        text: "Снять выделение",
        handler: () => dispatch(abortSelection()),
        isDisabled: selected.length === 0,
        separator: "bottom",
      },
      {
        text: <>&#8630; назад {past.length}</>,
        handler: () => dispatch(undo()),
        isDisabled: !past.length,
      },
      {
        text: <>&#8631; вперед {future.length}</>,
        handler: () => dispatch(redo()),
        isDisabled: !future.length,
        separator: "bottom",
      },
      {
        text: "Копировать",
        handler: () => dispatch(copySelectedElementsToBuffer()),
        isDisabled: selected.length === 0,
      },
      {
        text: "Вставить",
        handler: () => dispatch(pasteElementsFromBuffer()),
        isDisabled: copyPasteBuffer.length === 0,
      },
    ],
    [dispatch, selected, past, future, copyPasteBuffer]
  );

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Menu text="Изменить" menu={menuElements} />
    </div>
  );
}
