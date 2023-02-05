import { useState } from "react";
import { useSelector } from "react-redux";
import { MIMIC } from "../../../constants/literals";
import { IPoint } from "../../../models/Editor";
import { useTypedDispatch } from "../../../store";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import {
  selectElement,
  selectElements,
  toggleElementSelection,
} from "../../../store/actionCreators/editorState";

import {
  selectSelectionDisabled,
  selectViewPosition,
} from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints from "../../../hooks/useGetBoxByMultiPoints";
import GroupMover from "../../Editor/views/GroupMover";
import SelectionRect from "../../Editor/views/SelectionRect";
import ShapeChanger from "../../Editor/views/ShapeChanger";

interface Props {
  children?: React.ReactNode;
}

const defaultPoints: [IPoint, IPoint] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

function ObjectSelector({ children }: Props) {
  const viewPosition = useSelector(selectViewPosition);
  const selectionDisabled = useSelector(selectSelectionDisabled);
  // const elements = useSelector(selectEditorElements);
  // const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const [showRect, setShowRect] = useState(false);
  const [selectorRect, setSelectorRect] = useState(defaultPoints);
  const [getBox] = useGetBoxByMultiPoints();
  const [top, left, width, height] = getBox(selectorRect);

  const handlePointerDown = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);

    const startPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);
    setSelectorRect([startPoint, startPoint]);
    setShowRect(true);
  };

  const handlePointerMove = (ev: any) => {
    ev.preventDefault();
    if (!showRect || selectionDisabled) return;
    const { clientX, clientY } = ev;
    const endPoint = correctPoint({ x: clientX, y: clientY }, viewPosition);
    setSelectorRect([selectorRect[0], endPoint]);
    dispatch(selectElements([selectorRect[0], endPoint]));
  };

  const handlePointerUp = (ev) => {
    ev.preventDefault();
    setShowRect(false);
  };

  const handleClick = (ev: any) => {
    const { clientX, clientY } = ev;
    const elements = document.elementsFromPoint(clientX, clientY);

    if (ev.shiftKey) {
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          dispatch(toggleElementSelection(parseInt(id)));
          break;
        }
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          dispatch(selectElement([parseInt(id)]));
          break;
        }
      }
    }
    ev.preventDefault();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}

      {showRect && !selectionDisabled && (
        <SelectionRect top={top} left={left} width={width} height={height} />
      )}
      <ShapeChanger />
      <GroupMover />
    </div>
  );
}

export default ObjectSelector;
