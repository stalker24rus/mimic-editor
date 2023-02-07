// import { useBem } from "@steroidsjs/core/hooks";

import { useSelector } from "react-redux";
import {
  selectSelectionArea,
  selectSelectionDisabled,
} from "../../../../store/selectors/editorState";

// import "./SelectionRect.scss";

export default function SelectionArea(): JSX.Element {
  // const bem = useBem("SelectionRect");
  const selectionDisabled = useSelector(selectSelectionDisabled);
  const { visible, position } = useSelector(selectSelectionArea);

  return (
    <>
      {visible && !selectionDisabled && (
        <div
          // className={bem.block()}
          style={{
            ...position,
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
      )}
    </>
  );
}
