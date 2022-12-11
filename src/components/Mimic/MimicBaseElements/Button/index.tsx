import { ELEMENT_TYPE_BUTTON, MIMIC } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  component: MimicElementProps;
}

export default function Button(props: Props): JSX.Element {
  const { attributes } = props.component;
  const { general, position, appearance, properties, action } = attributes;
  const { id } = general;
  const { points, width, height, top, left } = position;
  const { fill, visability, stroke, strokeWidth } = appearance;
  const { text } = properties;

  const style = " block  px-3 py-2 rounded-md bg-blue-500 text-white";

  return (
    <button
      id={MIMIC + "." + ELEMENT_TYPE_BUTTON + "." + id}
      className={style}
      style={{ width, height }}
    >
      {text}
    </button>
  );
}
