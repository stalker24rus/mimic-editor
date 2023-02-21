import { IMimicElement } from "../../../../../../../../models/Editor";
import Polygon from "../../../../../../../../ui/Mimic/Primitives/Polygon";

export default function DemoPolygon() {
  const demoState: IMimicElement = {
    type: "POLYGON",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoLine",
        tagName: "",
      },
      appearance: {
        stroke: "rgba(59,130,246, 1)",
        strokeWidth: 3,
        fill: "rgba(59,130,246, 0.5)",
        opacity: 1,
      },

      properties: {},

      position: {
        // width: 90,
        // height: 90,
        // top: 0,
        // left: 0,
        points: [
          { x: 10, y: 10 },
          { x: 10, y: 80 },
          { x: 80, y: 80 },
          { x: 80, y: 10 },
          { x: 45, y: 45 },
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
      <Polygon disablePointerEvents={true} component={demoState} />
    </div>
  );
}
