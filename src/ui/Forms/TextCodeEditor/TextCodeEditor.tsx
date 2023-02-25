import { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface Props {
  value: number | string;
  props?: { [key: string]: any };
  onChange: Function;
}
//https://codesandbox.io/embed/react-textarea-code-editor-for-example-mcebp?fontsize=14&hidenavigation=1&theme=dark
export default function TextCodeEditor({
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
    <CodeEditor
      value={val}
      language="js"
      placeholder="Пожалуйста введите JS-код."
      onChange={handleChange}
      padding={15}
      style={{
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        fontSize: 12,
        minWidth: "250px",
      }}
      {...props}
    />
  );
}
