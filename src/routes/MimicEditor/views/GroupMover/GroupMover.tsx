import { useState } from "react";
import { useSelector } from "react-redux";
import { IPoint } from "../../../../models/Editor";
import { useTypedDispatch } from "../../../../store";
import {
  endDoingChanges,
  moveElementGroup,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import { selectMimicElements } from "../../../../store/selectors/editableMimic";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import { useGetBoxFromElements } from "../../../../hooks/useGetBoxByMultiPoints";

const BORDER: number = 10;

export default function GroupMover(): JSX.Element {
  const elements = useSelector(selectMimicElements);
  const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const [isDragging, setIsDragging] = useState(false);

  const [getBoxFromElements] = useGetBoxFromElements();

  const selectedElements = elements.filter((element) => {
    return selected.indexOf(element.attributes.general.id) !== -1;
  });

  const [top, left, width, height] = getBoxFromElements(selectedElements);

  const handlePointerDown = (ev) => {
    const { target, pointerId } = ev;
    target.setPointerCapture(pointerId);
    setIsDragging(true);
    dispatch(startDoingChanges());
  };

  const handlePointerMove = (ev) => {
    if (isDragging) {
      const { movementX, movementY } = ev;
      const movement: IPoint = {
        x: movementX,
        y: movementY,
      };
      dispatch(moveElementGroup(movement));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dispatch(endDoingChanges());
  };

  return (
    <>
      {selectedElements.length > 1 && (
        <div
          style={{
            top: top - BORDER,
            left: left - BORDER,
            width: width + BORDER * 2,
            height: height + BORDER * 2,
            position: "absolute",
            border: "1px dotted white",
            cursor: "move",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="w-100 h-100 bg-stone-50 rounded-md"
            style={{
              top: "-25px",
              left: 0,
              position: "absolute",
              cursor: "move",
            }}
          >
            Группа выделения
          </div>
        </div>
      )}
    </>
  );
}
