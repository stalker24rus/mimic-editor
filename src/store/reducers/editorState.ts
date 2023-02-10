import lodash from "lodash";
import {
  COPY_SELECTED_ELEMENTS_TO_BUFFER,
  DISABLE_SELECT_OPERATIONS,
  ENABLE_SELECT_OPERATIONS,
  ABORT_SELECTION,
  SET_CREATED_ELEMENT_ID,
  SET_CREATION_MODE,
  SET_EDIT_MODE,
  SET_OPERATION_MODE,
  SET_SELECTED_ELEMENTS,
  SET_SELECTION_AREA,
  SET_SELECTION_AREA_VISIBLE,
  SET_CANVAS_RECT_POSITION,
  ADD_ELEMENT_TO_SELECTION,
} from "../actionTypes/editorState";
import {
  EDITOR_MODE_CREATE,
  EDITOR_MODE_EDIT,
  EDITOR_MODE_OPERATE,
  ELEMENT_TYPE_GROUP,
  HEADER_HEIGHT,
} from "../../constants/literals";
import {
  CanvasNewElement,
  EditorModeProps,
  IMimicElement,
  IPoint,
} from "../../models/Editor";

type DrawType = number | undefined;

interface IProps {
  mode: EditorModeProps;
  /**
   * cursor:{
   *    position: {
   *      real: {
   *        x: number;
   *        y: number;
   *      },
   *      canvas: {
   *        x: number;
   *        y: number;
   *      }
   *    }
   * }
   */
  newElement: CanvasNewElement | {};
  drawId: DrawType;
  canvasRectPosition: IPoint;
  selected: number[];
  selectionDisabled: boolean;
  selectionArea: {
    visible: boolean;
    selector: { begin: IPoint; end: IPoint };
    position: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
  }; // FIXME
  copyPasteBuffer: IMimicElement[];
  operations?: IOperations;
}

export interface IOperations {
  canGroup: boolean; // selected > 1
  canUnGroup: boolean; // if selected === 1 and selection type === GROUP
  canUndo: boolean; //disabled={!props.past.length}
  canRedo: boolean; //disabled={!props.future.length}
  canMoveOnTop: boolean; //disabled={!(props.selected.length >= 1)}
  canMoveOnForward: boolean; //disabled={props.selected.length !== 1}
  canMoveOnBottom: boolean; //disabled={!(props.selected.length >= 1)}
  canMoveOnBack: boolean; //disabled={props.selected.length !== 1}
  canCopy: boolean; //disabled={props.selected.length === 0}
  canPaste: boolean; //disabled={props.copyPasteBuffer.length === 0}
  canEscape: boolean; //disabled={props.selected.length === 0}
  canSelectAll: boolean; // true
  canDelete: boolean; //disabled={props.selected.length === 0}
}

const defaultState = (): IProps => {
  return {
    mode: EDITOR_MODE_EDIT,
    newElement: { type: undefined, attributes: undefined }, // TODO объединить
    drawId: undefined, // TODO объединить
    canvasRectPosition: { x: 0, y: HEADER_HEIGHT }, // TODO Canvas position
    selected: [],
    selectionDisabled: false,
    selectionArea: {
      visible: false,
      selector: {
        begin: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      },
      position: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    },
    copyPasteBuffer: [],
    operations: {
      canGroup: false,
      canUnGroup: false,
      canUndo: false,
      canRedo: false,
      canMoveOnTop: true,
      canMoveOnForward: false,
      canMoveOnBottom: true,
      canMoveOnBack: false,
      canCopy: true,
      canPaste: false,
      canEscape: true,
      canSelectAll: true,
      canDelete: false,
    },
  };
};

const editorState = (state = defaultState(), action: any): IProps => {
  switch (action.type) {
    case SET_EDIT_MODE: {
      return {
        ...state,
        mode: EDITOR_MODE_EDIT,
        newElement: {},
        drawId: undefined,
      };
    }

    case SET_CREATION_MODE: {
      const { element } = action?.payload;

      if (element) {
        return {
          ...state,
          mode: EDITOR_MODE_CREATE,
          newElement: { ...element },
        };
      } else {
        return state;
      }
    }

    case ABORT_SELECTION: {
      if (state.mode === EDITOR_MODE_CREATE) {
        return {
          ...state,
          mode: EDITOR_MODE_EDIT,
          newElement: {},
          drawId: undefined,
        };
      }

      if (state.selected.length > 0) {
        return {
          ...state,
          selected: [],
        };
      }

      return state;
    }

    case SET_OPERATION_MODE: {
      return {
        ...state,
        mode: EDITOR_MODE_OPERATE,
        newElement: {},
        drawId: undefined,
      };
    }

    case SET_CREATED_ELEMENT_ID: {
      const { id } = action?.payload;
      if (id) {
        return { ...state, drawId: id };
      } else {
        return state;
      }
    }

    case SET_CANVAS_RECT_POSITION: {
      const { point } = action.payload;
      if (point) {
        return { ...state, canvasRectPosition: point };
      } else {
        return state;
      }
    }

    case SET_SELECTED_ELEMENTS: {
      const { selected, elements } = action.payload;
      let isSelectedGroup = false;

      for (let i = 0; i < elements.length; i++) {
        const element: IMimicElement = elements[i];
        if (
          element.attributes.general.id === selected[0] &&
          element.type === ELEMENT_TYPE_GROUP
        ) {
          isSelectedGroup = true;
        }
      }

      const operations = {
        ...state.operations,
        canGroup: selected.length > 1 && !isSelectedGroup,
        canUnGroup: isSelectedGroup,
        canMoveOnTop: selected.length > 0,
        canMoveOnForward: selected.length === 1,
        canMoveOnBottom: selected.length > 0,
        canMoveOnBack: selected.length === 1,
        canCopy: selected.length > 0,
        canDelete: selected.length > 0,
      };
      return { ...state, selected, operations };
    }

    case SET_SELECTION_AREA: {
      const { selector, position } = action.payload;

      return {
        ...state,
        selectionArea: { ...state.selectionArea, selector, position },
      };
    }

    case SET_SELECTION_AREA_VISIBLE: {
      const { visible } = action.payload;

      return {
        ...state,
        selectionArea: { ...state.selectionArea, visible },
      };
    }

    case DISABLE_SELECT_OPERATIONS: {
      return { ...state, selectionDisabled: true };
    }

    case ENABLE_SELECT_OPERATIONS: {
      return { ...state, selectionDisabled: false };
    }

    case ADD_ELEMENT_TO_SELECTION: {
      const { id } = action.payload;

      if (state.selected.includes(id)) {
        const selected = state.selected.filter((element) => !(element === id));
        return { ...state, selected: [...selected] };
      } else {
        return { ...state, selected: [...state.selected, id] };
      }
    }

    case COPY_SELECTED_ELEMENTS_TO_BUFFER: {
      const { elements, selected } = action.payload;

      const copiedArr = [];

      for (let i = 0; i < elements.length; i++) {
        const element: IMimicElement = elements[i];
        if (selected.includes(element.attributes.general.id)) {
          copiedArr.push(lodash.cloneDeep(element));
        }
      }

      const operations = {
        ...state.operations,
        canPaste: copiedArr.length > 0,
      };

      return { ...state, copyPasteBuffer: copiedArr, operations };
    }

    default:
      return state;
  }
};

export default editorState;
