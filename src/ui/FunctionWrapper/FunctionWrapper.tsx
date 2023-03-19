import * as Babel from "@babel/standalone";
import { useCallback } from "react";
import { IEvents } from "../../models/Editor";
import { executeFunction } from "../../utils/JS-Interpreter";

// import Babel from "@babel/standalone"

interface IProps {
  events: IEvents;
  scripts: string;
  children: JSX.Element | JSX.Element[];
}

export default function FunctionWrapper({ events, scripts, children }: IProps) {
  const handleAction = useCallback(
    (ev) => {
      if (events) {
        try {
          const { code } = Babel.transform(scripts, { presets: ["env"] });
          executeFunction(code, ev.type);
          // IF YOU WANT SHOW A CODE, UNCOMITTED IT
          // console.log("before >>> ", scripts);
          console.log("after  >>> ", code);
        } catch (error) {
          alert(error);
        }
      }
    },
    [events]
  );

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
