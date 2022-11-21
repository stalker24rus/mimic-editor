import {
  SET_CREATED_ELEMENT,
  SET_DRAWING_ID,
  SET_LAST_TAKEN_ID,
  SET_MODE,
} from "../constants/actionTypes/editorState";
import { EDITOR_MODE_EDIT, MIMIC_FRAME_ID } from "../constants/literals";

interface Props {
  mode: string;
  newElement: {};
  drawId: number | undefined;
  lastTakenId: number;
  viewPosition: {
    x: number;
    y: number;
  };
  currentMimic: {};
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
      type: "Frame",
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

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CREATED_ELEMENT: {
      return state;
    }

    case SET_MODE_CREATE: {
      const canvas: MimicCanvasStorage = {
        ...state.canvas,
        mode: "CREATE",
        newElement: { ...payload },
      };

      return { ...state, canvas };
    }

    case SET_MODE: {
      const { mode } = action.payload;
      return { ...state, mode };
    }

    case SET_DRAWING_ID: {
      const { id } = action.payload;
      return { ...state, draw: { ...state.draw, id } };
    }

    case SET_LAST_TAKEN_ID: {
      const { id } = action.payload;
      return { ...state, service: { ...state.service, lastTakenId: id } };
    }

    default:
      return state;
  }
};
