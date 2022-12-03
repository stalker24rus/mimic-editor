import { REDO, UNDO } from "../../constants/actionTypes/undoRedo";

export default function undoRedo(reducer: Function) {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state = initialState, action: any) {
    const { past, present, future } = state;

    switch (action.type) {
      case UNDO: {
        if (past.length > 0) {
          const previous = past[past.length - 1];
          const newPast = past.slice(0, past.length - 1);
          return {
            past: newPast,
            present: previous,
            future: [present, ...future],
          };
        } else {
          return state;
        }
      }

      case REDO: {
        if (future.length > 0) {
          const next = future[0];
          const newFuture = future.slice(1);
          return {
            past: [...past, present],
            present: next,
            future: newFuture,
          };
        } else {
          return state;
        }
      }

      default:
        const newPresent = reducer(present, action);

        if (present === newPresent) {
          return state;
        }

        const passHistrory = action?.passHistrory ? true : false;
        if (passHistrory) {
          return {
            past: [...past],
            present: newPresent,
            future: [],
          };
        } else {
          return {
            past: [...past, present],
            present: newPresent,
            future: [],
          };
        }
    }
  };
}
