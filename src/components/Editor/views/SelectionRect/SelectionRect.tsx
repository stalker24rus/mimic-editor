// import { useBem } from "@steroidsjs/core/hooks";

// import "./SelectionRect.scss";

interface Props {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function SelectionRect(props: Props): JSX.Element {
  // const bem = useBem("SelectionRect");
  const { top, left, width, height } = props;

  return (
    <div
      // className={bem.block()}
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
