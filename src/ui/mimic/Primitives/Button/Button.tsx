import { ELEMENT_TYPE_BUTTON, MIMIC } from "../../../../constants/literals";
import { BaseElementOutput, IMimicElement } from "../../../../models/Editor";
import FunctionWrapper from "../../../FunctionWrapper";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
}

export default function Button(props: Props): JSX.Element {
  const { attributes } = props.component;
  const { general, position, appearance, properties, action, font, events } =
    attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability, stroke, strokeWidth, textColor, opacity } =
    appearance;
  const { fontFamily, fontStyle, fontWeight, fontSize, horizonAlign } = font;
  const { text } = properties;

  const style = "rounded-md ";

  return (
    <FunctionWrapper events={events}>
      <button
        id={MIMIC + "." + ELEMENT_TYPE_BUTTON + "." + id}
        className={style}
        style={{
          position: "absolute",
          top: points[0]?.y | 0,
          left: points[0]?.x | 0,
          width,
          height,
          transform: ` rotate(${angle ? angle : 0}deg)`,
          background: fill,
          border: `${strokeWidth}px solid ${stroke}`,
          color: textColor,
          opacity: opacity,
          fontSize: fontSize,
          fontStyle: fontStyle,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          textAlign: horizonAlign,
          pointerEvents: props.disablePointerEvents ? "none" : "painted",
        }}
      >
        {text}
      </button>
    </FunctionWrapper>
  );
}

export const startState: BaseElementOutput = {
  attributes: {
    appearance: {
      fill: "rgba(59,130,246, 1)",
      stroke: "rgba(59,130,246, 1)",
      textColor: "rgba(255,255,255, 1)",
      strokeWidth: 1,
      opacity: 1,
      visability: true,
    },

    properties: {
      text: "Кнопка",
    },

    position: {
      points: [],
      angle: 0,
      width: 150,
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
};
