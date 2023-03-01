import CodeEditor from "@uiw/react-textarea-code-editor";
import { useCallback, useMemo } from "react";

export default function CodeView({ text, onChange }) {
  const memoText = useMemo(() => text, [text]);

  const handleChange = useCallback(
    (ev) => {
      onChange(ev);
    },
    [onChange]
  );

  return (
    <CodeEditor
      value={memoText}
      language="js"
      placeholder="Пожалуйста введите JS-код."
      onChange={handleChange}
      padding={15}
      style={{
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        fontSize: 12,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
