import { useState } from "react";
import { connect } from "react-redux";
import { APP_VERSION, HEADER_HEIGHT } from "../../../constants/literals";
import { MimicElementProps } from "../../../models/Editor";
import {
  deleteSelectedElements,
  groupElements,
  moveOnBackLevel,
  moveOnBottomLevel,
  moveOnForwardLevel,
  moveOnTopLevel,
  pasteElements,
  redo,
  undo,
} from "../../../store/actionCreators/editorElements";
import {
  copyElements,
  escapeElements,
} from "../../../store/actionCreators/editorState";
import {
  selectSelectedElements,
  selectCopyPasteBuffer,
} from "../../../store/selectors/editorState";

interface StateProps {
  future: [any];
  past: [any];
  selected: number[] | undefined;
  copyPasteBuffer: MimicElementProps[];
}

interface DispatchProps {
  onUndo: Function;
  onRedo: Function;
  onTopLevel: Function;
  onForwardLevel: Function;
  onBottomLevel: Function;
  onBackLevel: Function;
  onCopy: Function;
  onPaste: Function;
  onEscape: Function;
  onDelete: Function;
  onGroupElements: Function;
}

interface OwnProps {
  children?: JSX.Element | JSX.Element[];
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    future: store.undoredobleEditorElements.future,
    past: store.undoredobleEditorElements.past,
    selected: selectSelectedElements(store),
    copyPasteBuffer: selectCopyPasteBuffer(store),
  };
}

function mapDispatchToProps() {
  return {
    onUndo: undo,
    onRedo: redo,
    onTopLevel: moveOnTopLevel,
    onForwardLevel: moveOnForwardLevel,
    onBottomLevel: moveOnBottomLevel,
    onBackLevel: moveOnBackLevel,
    onCopy: copyElements,
    onPaste: pasteElements,
    onEscape: escapeElements,
    onDelete: deleteSelectedElements,
    onGroupElements: groupElements,
  };
}

const EditorHeader = (props: Props): JSX.Element => {
  const handleUndo = () => {
    props.onUndo();
  };

  const handleRedo = () => {
    props.onRedo();
  };

  const handleOnTopLevel = () => {
    props.onTopLevel();
  };

  const handleOnForwardLevel = () => {
    props.onForwardLevel();
  };

  const handleOnBottomLevel = () => {
    props.onBottomLevel();
  };

  const handleOnBackLevel = () => {
    props.onBackLevel();
  };

  const handleCopy = () => {
    props.onCopy();
  };

  const handlePaste = () => {
    props.onPaste();
  };

  const handleEscape = () => {
    props.onEscape();
  };

  const handleDelete = () => {
    props.onDelete();
  };

  const handleGroupElements = () => props.onGroupElements();

  const [menuChange, setMenuChanges] = useState(false);
  const [menuPosition, setMenuPosition] = useState(false);

  const change = "change";
  const position = "position";
  const handleOpenMenu = (menu: string) => {
    switch (menu) {
      case change: {
        setMenuChanges(!menuChange);
        setMenuPosition(false);
        break;
      }
      case position: {
        setMenuPosition(!menuPosition);
        setMenuChanges(false);
        break;
      }

      default: {
        setMenuChanges(false);
        setMenuPosition(false);
      }
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-gray-900 to-gray-50"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="inline-flex" id="Component" style={{ top: 0, left: 0 }}>
        <div className="text-1xl text-center font-small text-white  align-middle m-1">
          <div style={{ fontSize: "18px" }}>MIMIC_EDITOR</div>
          <div style={{ fontSize: "10px" }}> {APP_VERSION}</div>
        </div>

        <div style={{ position: "relative" }}>
          <button
            className="text-white bg-grey-700 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
            style={{
              height: HEADER_HEIGHT,
            }}
            onClick={() => handleOpenMenu(change)}
          >
            Изменить
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {menuChange && (
            <div
              className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
              style={{
                top: HEADER_HEIGHT,
                left: 0,
                position: "absolute",
                zIndex: 1,
              }}
            >
              <ul>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleDelete}
                    disabled={props.selected.length === 0}
                  >
                    Удалить
                  </button>
                </li>

                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleEscape}
                    disabled={props.selected.length === 0}
                  >
                    Снять выделение
                  </button>
                </li>
              </ul>
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleUndo}
                    disabled={!props.past.length}
                  >
                    &#8630; назад {props.past.length}
                  </button>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleRedo}
                    disabled={!props.future.length}
                  >
                    &#8631; вперед {props.future.length}
                  </button>
                </li>
              </ul>
              <ul>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleCopy}
                    disabled={props.selected.length === 0}
                  >
                    Копировать
                  </button>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handlePaste}
                    disabled={props.copyPasteBuffer.length === 0}
                  >
                    Вставить
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <button
            className="text-white bg-grey-700 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
            style={{
              height: HEADER_HEIGHT,
            }}
            onClick={() => handleOpenMenu(position)}
          >
            Расстановка
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {menuPosition && (
            <div
              className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
              style={{
                top: HEADER_HEIGHT,
                left: 0,
                position: "absolute",
                zIndex: 1,
              }}
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleOnTopLevel}
                    disabled={!(props.selected.length >= 1)}
                  >
                    на передний план
                  </button>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleOnForwardLevel}
                    disabled={props.selected.length !== 1}
                  >
                    вперед
                  </button>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleOnBottomLevel}
                    disabled={!(props.selected.length >= 1)}
                  >
                    на задний план
                  </button>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                    style={{
                      width: "100%",
                    }}
                    onClick={handleOnBackLevel}
                    disabled={props.selected.length !== 1}
                  >
                    назад
                  </button>
                </li>
              </ul>
              <ul>
                <button
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
                  style={{
                    width: "100%",
                  }}
                  onClick={handleGroupElements}
                  disabled={!(props.selected.length > 1)}
                >
                  Группировать
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(EditorHeader);
