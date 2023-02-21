import { IMimicElement } from "../../../../models/Editor";
import Polyline from "./Polyline";

export default function Demo() {
  const demoState: IMimicElement = {
    type: "POLYLINE",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoPoliline",
        tagName: "",
      },
      appearance: {
        stroke: "rgba(59,130,246, 1)",
        strokeWidth: 5,
        opacity: 1,
      },

      properties: {},

      position: {
        width: 90,
        height: 90,
        top: 0,
        left: 0,
        points: [
          { x: 5, y: 70 },
          { x: 65, y: 15 },
          { x: 85, y: 70 },
          { x: 30, y: 70 },
          { x: 60, y: 40 },
          { x: 70, y: 65 },
          // { x: 80, y: 80 },
          // { x: 80, y: 10 },
          // { x: 45, y: 45 },
        ],
      },

      font: {
        fontFamily: "Arial",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "normal",
        horizonAlign: "center",
      },

      action: {
        operation: "none",
        handler: undefined,
      },
    },
    children: [],
  };

  return (
    <div
      style={{
        cursor: "pointer",
        height: "90px",
        width: "90px",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <Polyline disablePointerEvents={true} component={demoState} />
    </div>
  );
}
