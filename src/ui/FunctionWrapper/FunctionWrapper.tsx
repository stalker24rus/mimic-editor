import { useCallback } from "react";
import { IEvents } from "../../models/Editor";

interface IProps {
  events: IEvents;
  children: JSX.Element | JSX.Element[];
}
function createFunction(ev, code) {
  const func = new Function("event", code);
  try {
    func(ev);
  } catch (error) {
    alert(error);
  }
}

export default function FunctionWrapper({ events, children }: IProps) {
  const handleAction = useCallback(
    (ev) => {
      if (events) {
        if (ev.type in events && events[ev.type].length > 0) {
          createFunction(ev, events[ev.type]);
        }
      }
    },
    [events]
  );

  return (
    <span
      onClick={handleAction}
      onPointerDown={handleAction}
      onPointerMove={handleAction}
      onPointerUp={handleAction}
    >
      {children}
    </span>
  );
}
