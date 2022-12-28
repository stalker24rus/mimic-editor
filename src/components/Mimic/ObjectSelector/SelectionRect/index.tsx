interface Props {
  top: number;
  left: number;
  width: number;
  height: number;
}

function SelectionRect(props: Props): JSX.Element {
  const { top, left, width, height } = props;

  return (
    <div
      style={{
        top,
        left,
        width,
        height,
        background: "#1E90FF",
        position: "absolute",
        opacity: 0.3,
        border: "2px dashed white",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {" "}
    </div>
  );
}

export default SelectionRect;
