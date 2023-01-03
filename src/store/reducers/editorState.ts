import lodash from "lodash";
import {
  COPY_ELEMENTS,
  DISABLE_SELECTION,
  // DISABLE_TOUCH,
  ENABLE_SELECTION,
  // ENABLE_TOUCH,
  HANDLE_ESCAPE,
  SELECT_ELEMENTS,
  SET_CURRENT_MIMIC,
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
  ELEMENT_TYPE_FRAME,
} from "../../constants/literals";
import {
  CanvasNewElement,
  EditorModeProps,
  MimicElementProps,
  PointFromat,
} from "../../models/Editor";
import checkIsPointInArea from "./functions/checkIsPointInArea";
import { getAreaPointsByHWP } from "./functions/getAreaPointsByHWP";
import rotateElementPoints from "./functions/rotateElementPoints";

type DrawType = number | undefined;

interface Props {
  mode: EditorModeProps;
  newElement: CanvasNewElement | {};
  drawId: DrawType;
  lastTakenId: number;
  viewPosition: PointFromat;
  // currentMimic: MimicElementProps;
  selected: number[];
  selectionDisabled: boolean;
  selectorRect: [PointFromat, PointFromat]; // FIXME
  copyPasteBuffer: MimicElementProps[];
  // isMimicTouch: boolean;
}

const defaultState = (): Props => {
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
    // isMimicTouch: true,
  };
};

export default (state = defaultState(), action: any): Props => {
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
        throw "Invalid playload format.";
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
        throw "Invalid playload format.";
      }
    }

    case SET_LAST_TAKEN_ID: {
      const { id } = action.payload;
      if (id) {
        return { ...state, lastTakenId: id };
      } else {
        throw "Invalid playload format.";
      }
    }

    // case SET_CURRENT_MIMIC: {
    //   const { mimic } = action.payload;
    //   if (mimic) {
    //     return { ...state, currentMimic: mimic };
    //   } else {
    //     throw "Invalid playload format.";
    //   }
    // }

    case SET_VIEW_POSITION: {
      const { point } = action.payload;
      if (point) {
        return { ...state, viewPosition: point };
      } else {
        throw "Invalid playload format.";
      }
    }

    case SET_SELECTED_ELEMENTS: {
      const { elements } = action.payload;
      return { ...state, selected: elements };
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

      for (let i = 0; i < elements.length; i++) {
        const element: MimicElementProps = elements[i];
        const { width, height, angle, points } = element.attributes.position;

        let tempPoints = [...points];

        let innerPoints = 0;

        if (width && height && angle !== undefined && points.length === 1) {
          const center = {
            x: tempPoints[0].x + width / 2,
            y: tempPoints[0].y + height / 2,
          };
          tempPoints = rotateElementPoints(
            center,
            getAreaPointsByHWP(width, height, tempPoints[0]),
            angle
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
        }
      }

      return { ...state, selected: [...selected] };
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
        const element: MimicElementProps = elements[i];
        if (selected.includes(element.attributes.general.id)) {
          copiedArr.push(lodash.cloneDeep(element));
        }
      }

      return { ...state, copyPasteBuffer: copiedArr };
    }

    //*********************************************** */
    // case DISABLE_TOUCH: {
    //   return { ...state, isMimicTouch: false };
    // }

    // case ENABLE_TOUCH: {
    //   return { ...state, isMimicTouch: true };
    // }
    //************************************************ */

    default:
      return state;
  }
};
