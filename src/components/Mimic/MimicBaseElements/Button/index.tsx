import { ELEMENT_TYPE_BUTTON, MIMIC } from "../../../../constants/literals";
import {
  BaseElementOutput,
  MimicElementProps,
} from "../../../../models/Editor";

interface Props {
  disablePointerEvents?: boolean;
  component: MimicElementProps;
}

export default function Button(props: Props): JSX.Element {
  const { attributes } = props.component;
  const { general, position, appearance, properties, action, font } =
    attributes;
  const { id } = general;
  const { points, width, height, top, left } = position;
  const { fill, visability, stroke, strokeWidth, textColor, opacity } =
    appearance;
  const { fontFamily, fontStyle, fontWeight, fontSize, horizonAlign } = font;
  const { text } = properties;

  const style = "rounded-md ";

  return (
    <button
      id={MIMIC + "." + ELEMENT_TYPE_BUTTON + "." + id}
      className={style}
      style={{
        width,
        height,
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

export const Demo = () => {
  const demoState: MimicElementProps = {
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
        points: [],
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

  return <Button disablePointerEvents={true} component={demoState} />;
};
