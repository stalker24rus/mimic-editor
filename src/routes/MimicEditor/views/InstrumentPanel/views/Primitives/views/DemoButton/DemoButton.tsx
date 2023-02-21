import { IMimicElement } from "../../../../../../../../models/Editor";
import Button from "../../../../../../../../ui/Mimic/Primitives/Button";

export default function DemoButton() {
  const demoState: IMimicElement = {
    type: "BUTTON",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoIcon",
        tagName: "",
      },
      appearance: {
        fill: "rgba(59,130,246, 1)",
        stroke: "rgba(59,130,246, 1)",
        textColor: "rgba(255,255,255, 1)",
        strokeWidth: 1,
        opacity: 1,
        visability: true,
      },

      properties: {
        text: "button",
      },

      position: {
        points: [
          {
            x: 0,
            y: 0,
          },
        ],
        angle: 0,
        width: 90,
        height: 50,
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
        height: "50px",
        width: "90px",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <Button disablePointerEvents={true} component={demoState} />;
    </div>
  );
}
