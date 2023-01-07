import { useEffect, useState } from "react";

interface Props {
  value: number | string;
  props?: { [key: string]: any };
  onChange: Function;
}

function limitNumberWithinRange(num, min, max) {
  const MIN = min || -9999999;
  const MAX = max || 9999999;
  const parsed = parseFloat(num);
  const result = Math.min(Math.max(parsed, MIN), MAX);
  return result;
}

const InputField = ({ value, props, onChange }: Props): JSX.Element => {
  const [val, setVal] = useState(value);
  const handleChange = (ev) => {
    const val = ev.target.value;
    let tempVal = val;

    if (props.type === "number") {
      tempVal = limitNumberWithinRange(tempVal, props.min, props.max);
    }
    /* Make update synchronous, to avoid caret jumping when the value doesn't change asynchronously */
    setVal(tempVal);
    /* Make the real update afterwards */
    onChange(ev);
  };

  useEffect(() => {
    let tempVal = value;

    if (props.type === "number") {
      tempVal = limitNumberWithinRange(tempVal, props.min, props.max);
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
