import { MimicElementProps } from "../../../../models/Editor";
import RectangleBox from "../../Transformers/RectangleBox";

interface Props {
  key: number;
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
    <RectangleBox component={props.component}>
      <button className={style} style={{ width, height }}>
        {text}
      </button>
    </RectangleBox>
  );
}
