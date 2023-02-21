import { IMimicElement } from "../../../../models/Editor";
import Line from "./Line";

export default function Demo() {
  const demoState: IMimicElement = {
    type: "LINE",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoPoligon",
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
          { x: 10, y: 10 },
          { x: 80, y: 80 },
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
      <Line disablePointerEvents={true} component={demoState} />
    </div>
  );
}
