import { useEffect, useState } from "react";
import limitNumber from "../../../utils/limitNumber";

interface Props {
  value: number | string;
  props?: { [key: string]: any };
  onChange: Function;
}

export default function TextArea({
  value,
  props,
  onChange,
}: Props): JSX.Element {
  const [val, setVal] = useState(value);
  const handleChange = (ev) => {
    const val = ev.target.value;
    let tempVal = val;
    setVal(tempVal);
    onChange(ev);
  };

  useEffect(() => {
    let tempVal = value;
    setVal(tempVal);
  }, [value]);

  return (
    <textarea
      value={val}
      {...props}
      onChange={handleChange}
      disabled={props.disabled || false}
    />
  );
}
