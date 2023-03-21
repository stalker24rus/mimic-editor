import CodeEditor from "@uiw/react-textarea-code-editor";

export default function CodeView({ value, onChange }) {
  const handleOnChange = (event) => {
    console.log(event);
    onChange(event.target.value);
  };

  return (
    <CodeEditor
      language="js"
      value={value}
      onChange={handleOnChange}
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
