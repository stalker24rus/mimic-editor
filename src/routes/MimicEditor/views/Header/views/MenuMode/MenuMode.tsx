import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  EDITOR_MODE_CREATE,
  EDITOR_MODE_EDIT,
  EDITOR_MODE_PREVIEW,
} from "../../../../../../constants/literals";
import { useTypedDispatch } from "../../../../../../store";
import {
  setEditorModeEdit,
  setEditorModePreview,
} from "../../../../../../store/actionCreators/editorState";
import { selectEditorMode } from "../../../../../../store/selectors/editorState";
import Menu from "../../../../../../ui/Menu";
import { IMenuObject } from "../../../../../../ui/Menu/Menu";

export default function MenuMode() {
  const dispatch = useTypedDispatch();
  const mode = useSelector(selectEditorMode);

  const menuElements: IMenuObject[] = useMemo(
    () => [
      {
        text: "Редактор",
        handler: () => dispatch(setEditorModeEdit()),
        isDisabled: mode === EDITOR_MODE_EDIT || mode === EDITOR_MODE_CREATE,
      },
      {
        text: "Просмотр",
        handler: () => dispatch(setEditorModePreview()),
        isDisabled: mode === EDITOR_MODE_PREVIEW,
      },
    ],
    [dispatch, mode]
  );

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Menu text="Режим" menu={menuElements} />
    </div>
  );
}
