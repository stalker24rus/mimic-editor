import { useEffect, useState } from "react";
import limitNumber from "../../../utils/limitNumber";

interface Props {
  value: number | string;
  props?: { [key: string]: any };
  onChange: Function;
}

const InputField = ({ value, props, onChange }: Props): JSX.Element => {
  const [val, setVal] = useState(value);
  const handleChange = (ev) => {
    const val = ev.target.value;
    let tempVal = val;

    if (props.type === "number") {
      tempVal = limitNumber(tempVal, props.min, props.max);
    }
    setVal(tempVal);
    onChange(ev);
  };

  useEffect(() => {
    let tempVal = value;

    if (props.type === "number") {
      tempVal = limitNumber(tempVal, props.min, props.max);
    }
    setVal(tempVal);
  }, [value]);

  return (
    <input
      value={val}
      {...props}
      onChange={handleChange}
      disabled={props.disabled || false}
    />
  );
};

export default InputField;
