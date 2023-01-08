import lodash from "lodash";
import {
  COPY_ELEMENTS,
  DISABLE_SELECTION,
  ENABLE_SELECTION,
  HANDLE_ESCAPE,
  SELECT_ELEMENTS,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_CREATE,
  SET_MODE_EDIT,
  SET_MODE_OPERATE,
  SET_SELECTED_ELEMENTS,
  SET_VIEW_POSITION,
  TOGGLE_ELEMENT_SELECTION,
} from "../../constants/actionTypes/editorState";
import {
  EDITOR_MODE_CREATE,
  EDITOR_MODE_EDIT,
  EDITOR_MODE_OPERATE,
  ELEMENT_TYPE_GROUP,
} from "../../constants/literals";
import {
  CanvasNewElement,
  EditorModeProps,
  IMimicElement,
  IPoint,
} from "../../models/Editor";
import checkIsPointInArea from "./logic/utils/checkIsPointInArea";
import { getAreaPointsByHWP } from "./logic/utils/getAreaPointsByHWP";
import rotateElementPoints from "./logic/utils/rotateElementPoints";

type DrawType = number | undefined;

interface IProps {
  mode: EditorModeProps;
  newElement: CanvasNewElement | {};
  drawId: DrawType;
  lastTakenId: number;
  viewPosition: IPoint;
  selected: number[];
  selectionDisabled: boolean;
  selectorRect: [IPoint, IPoint]; // FIXME
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
    newElement: { type: undefined, attributes: undefined },
    drawId: undefined,
    lastTakenId: 99,
    viewPosition: { x: 0, y: 0 },
    selected: [],
    selectionDisabled: false,
    selectorRect: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
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
    case SET_MODE_EDIT: {
      return {
        ...state,
        mode: EDITOR_MODE_EDIT,
        newElement: {},
        drawId: undefined,
      };
    }

    case SET_MODE_CREATE: {
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

    case HANDLE_ESCAPE: {
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

    case SET_MODE_OPERATE: {
      return {
        ...state,
        mode: EDITOR_MODE_OPERATE,
        newElement: {},
        drawId: undefined,
      };
    }

    case SET_DRAWING_ID: {
      const { id } = action?.payload;
      if (id) {
        return { ...state, drawId: id };
      } else {
        return state;
      }
    }

    case SET_LAST_TAKEN_ID: {
      const { id } = action.payload;
      if (id) {
        return { ...state, lastTakenId: id };
      } else {
        return state;
      }
    }

    case SET_VIEW_POSITION: {
      const { point } = action.payload;
      if (point) {
        return { ...state, viewPosition: point };
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

    case DISABLE_SELECTION: {
      return { ...state, selectionDisabled: true };
    }

    case ENABLE_SELECTION: {
      return { ...state, selectionDisabled: false };
    }

    case SELECT_ELEMENTS: {
      const { area, elements } = action.payload;

      const selected = [];
      let isSelectedGroup = false;

      for (let i = 0; i < elements.length; i++) {
        const element: IMimicElement = elements[i];
        const { width, height, angle, points } = element.attributes.position;

        let tempPoints = [...points];

        let innerPoints = 0;

        if (width && height !== undefined && points.length === 1) {
          const center = {
            x: tempPoints[0].x + width / 2,
            y: tempPoints[0].y + height / 2,
          };
          tempPoints = rotateElementPoints(
            center,
            getAreaPointsByHWP(width, height, tempPoints[0]),
            angle | 0
          );
        }

        for (let j = 0; j < tempPoints.length; j++) {
          const point = tempPoints[j];

          if (checkIsPointInArea(area, point)) {
            innerPoints++;
          }
        }

        if (innerPoints === tempPoints.length) {
          selected.push(element.attributes.general.id);
          isSelectedGroup = element.type === ELEMENT_TYPE_GROUP;
        }
      }

      isSelectedGroup = isSelectedGroup && selected.length === 1;

      const operations = {
        ...state.operations,
        canGroup: elements.length > 1 && !isSelectedGroup,
        canUnGroup: isSelectedGroup,
        canMoveOnTop: elements.length > 0,
        canMoveOnForward: elements.length === 1,
        canMoveOnBottom: elements.length > 0,
        canMoveOnBack: elements.length === 1,
        canCopy: elements.length > 0,
        canDelete: elements.length > 0,
      };

      return { ...state, selected: [...selected], operations };
    }

    case TOGGLE_ELEMENT_SELECTION: {
      const { id } = action.payload;

      if (state.selected.includes(id)) {
        const selected = state.selected.filter((element) => !(element === id));
        return { ...state, selected: [...selected] };
      } else {
        return { ...state, selected: [...state.selected, id] };
      }
    }

    case COPY_ELEMENTS: {
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
