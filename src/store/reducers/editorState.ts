import {
  // ADD_ELEMENT_TO_SELECTION_LIST,
  // DEL_ELEMENT_FROM_SELECTION_LIST,
  DISABLE_SELECTION,
  ENABLE_SELECTION,
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

type DrawType = number | undefined;

interface Props {
  mode: EditorModeProps;
  newElement: CanvasNewElement | {};
  drawId: DrawType;
  lastTakenId: number;
  viewPosition: PointFromat;
  currentMimic: MimicElementProps;
  selected: number[];
  selectionDisabled: boolean;
  selectorRect: [PointFromat, PointFromat]; // FIXME
}

const defaultState = (): Props => {
  return {
    mode: EDITOR_MODE_EDIT,
    newElement: { type: undefined, attributes: undefined, service: undefined },
    drawId: undefined,
    lastTakenId: 1,
    viewPosition: { x: 0, y: 0 },
    selected: [],
    selectionDisabled: false,
    selectorRect: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    currentMimic: {
      type: ELEMENT_TYPE_FRAME,
      layer: 0,
      service: undefined,
      attributes: {
        general: {
          id: 0,
          name: "mimic.frame",
          tagName: undefined,
        },
        position: {
          points: [
            {
              x: 0,
              y: 0,
            },
          ],
          width: 1300,
          height: 1100,
        },
        appearance: {
          fill: "#CECECE",
        },
        properties: {
          title: "Mimic",
          lastTakenID: 1,
        },
      },
      children: [],
    },
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

    case SET_CURRENT_MIMIC: {
      const { mimic } = action.payload;
      if (mimic) {
        return { ...state, currentMimic: mimic };
      } else {
        throw "Invalid playload format.";
      }
    }

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
        const { width, height, points } = element.attributes.position;

        let innerPoints = 0;

        for (let j = 0; j < points.length; j++) {
          const point = points[j];

          if (checkIsPointInArea(area, point)) {
            innerPoints++;
          }
        }

        if (innerPoints === points.length) {
          selected.push(element.attributes.general.id);
        }
      }

      return { ...state, selected: [...selected] };
    }

    // case ADD_ELEMENT_TO_SELECTION_LIST: {
    //   const { id } = action.payload;
    //   return { ...state, selected: [...state.selected, id] };
    // }

    // case DEL_ELEMENT_FROM_SELECTION_LIST: {
    //   const { id } = action.payload;
    //   const selected = state.selected.filter((element) => !(element === id));
    //   return { ...state, selected: [...selected] };
    // }

    case TOGGLE_ELEMENT_SELECTION: {
      const { id } = action.payload;

      if (state.selected.includes(id)) {
        const selected = state.selected.filter((element) => !(element === id));
        return { ...state, selected: [...selected] };
      } else {
        return { ...state, selected: [...state.selected, id] };
      }
    }

    default:
      return state;
  }
};
