import {
  SET_CURRENT_MIMIC,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE_CREATE,
  SET_MODE_EDIT,
  SET_MODE_OPERATE,
  SET_VIEW_POSITION,
} from "../../constants/actionTypes/editorState";
import {
  EDITOR_MODE_CREATE,
  EDITOR_MODE_EDIT,
  EDITOR_MODE_OPERATE,
  ELEMENT_TYPE_FRAME,
  MIMIC_FRAME_ID,
} from "../../constants/literals";
import {
  CanvasNewElement,
  EditorModeProps,
  MimicElementProps,
  PointFromat,
} from "../../models/Editor";

interface Props {
  mode: EditorModeProps;
  newElement: CanvasNewElement;
  drawId: number | undefined;
  lastTakenId: number;
  viewPosition: PointFromat;
  currentMimic: MimicElementProps;
}

const defaultState = (): Props => {
  const { left, top } = document
    .getElementById(MIMIC_FRAME_ID)
    .getBoundingClientRect();

  return {
    mode: EDITOR_MODE_EDIT,
    newElement: { type: undefined, attributes: undefined, service: undefined },
    drawId: undefined,
    lastTakenId: 0,
    viewPosition: { x: 0, y: 0 },
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
              x: top | 0,
              y: left | 0,
            },
          ],
          width: 800,
          height: 600,
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

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_MODE_EDIT: {
      return { ...state, mode: EDITOR_MODE_EDIT, newElement: {} };
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

    case SET_MODE_OPERATE: {
      return { ...state, mode: EDITOR_MODE_OPERATE, newElement: {} };
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
      const { position } = action.payload;
      if (position) {
        return { ...state, viewPosition: position };
      } else {
        throw "Invalid playload format.";
      }
    }

    default:
      return state;
  }
};
