import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../../../../../store";
import {
  groupElements,
  moveOnBackLevel,
  moveOnBottomLevel,
  moveOnForwardLevel,
  moveOnTopLevel,
  unGroupElements,
} from "../../../../../../store/actionCreators/editorElements";
import {
  selectEditorAccessibleOperations,
  selectSelectedElements,
} from "../../../../../../store/selectors/editorState";
import Menu from "../../../../../../ui/Menu";
import { IMenuObject } from "../../../../../../ui/Menu/Menu";

export default function MenuPlacing() {
  const dispatch = useTypedDispatch();
  const selected = useSelector(selectSelectedElements);
  const operations = useSelector(selectEditorAccessibleOperations);

  const menuElements: IMenuObject[] = useMemo(
    () => [
      {
        text: "на передний план",
        handler: () => dispatch(moveOnTopLevel()),
        isDisabled: !(selected.length >= 1),
      },
      {
        text: "вперед",
        handler: () => dispatch(moveOnForwardLevel()),
        isDisabled: selected.length !== 1,
      },
      {
        text: "на задний план",
        handler: () => dispatch(moveOnBottomLevel()),
        isDisabled: !(selected.length >= 1),
      },
      {
        text: "назад",
        handler: () => dispatch(moveOnBackLevel()),
        isDisabled: selected.length !== 1,
      },
      {
        text: "Группировать",
        handler: () => dispatch(groupElements()),
        isDisabled: !operations.canGroup,
      },
      {
        text: "Разгруппировать",
        handler: () => dispatch(unGroupElements()),
        isDisabled: !operations.canUnGroup,
      },
    ],
    [dispatch, selected, operations]
  );

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Menu text="Расстановка" menu={menuElements} />
    </div>
  );
}
