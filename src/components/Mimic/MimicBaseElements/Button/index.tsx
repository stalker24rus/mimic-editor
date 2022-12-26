import { ELEMENT_TYPE_BUTTON, MIMIC } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";

interface Props {
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
      }}
    >
      {text}
    </button>
  );
}
