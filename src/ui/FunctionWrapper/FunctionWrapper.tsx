import { useCallback } from "react";
import { IEvents } from "../../models/Editor";
import { executeFunction } from "../../utils/JS-Interpreter";

interface IProps {
  events: IEvents;
  scripts: string;
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

export default function FunctionWrapper({ events, scripts, children }: IProps) {
  const handleAction = useCallback(
    (ev) => {
      if (events) {
        if (ev.type in events && events[ev.type].length > 0) {
          createFunction(ev, events[ev.type]);
        }
        executeFunction(scripts, ev.type);
      }
    },
    [events]
  );

  // console.log("onClick", getFunctionCode("onClick", scripts || ""));
  // console.log("onPointerDown", getFunctionCode("onPointerDown", scripts || ""));
  // console.log("onPointerMove", getFunctionCode("onPointerMove", scripts || ""));
  // console.log("onPointerUp", getFunctionCode("onPointerUp", scripts || ""));

  return (
    <span
      onClick={handleAction}
      // onPointerDown={handleAction}
      // onPointerMove={handleAction}
      // onPointerUp={handleAction}
    >
      {children}
    </span>
  );
}
