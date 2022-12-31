import { useState } from "react";
import { connect } from "react-redux";
import { MIMIC } from "../../../constants/literals";
import { MimicElementProps, PointFromat } from "../../../models/Editor";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import {
  selectElement,
  selectElements,
  toggleElementSelection,
} from "../../../store/actionCreators/editorState";
import { selectEditorElements } from "../../../store/selectors/editorElements";
import {
  selectSelectedElements,
  selectSelectionDisabled,
  selectViewPosition,
} from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints from "../Hooks/useGetBoxByMultiPoints";
import GroupMover from "./GroupMover";
import SelectionRect from "./SelectionRect";

interface StateProps {
  viewPosition: PointFromat;
  selectionDisabled: boolean;
  selected: number[];
  elements: MimicElementProps[];
}

interface DispatchProps {
  onSelectElement: Function;
  onSelectElements: Function;
  onToggleSelect: Function;
}

interface OwnProps {
  children?: React.ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    viewPosition: selectViewPosition(store),
    selectionDisabled: selectSelectionDisabled(store),
    elements: selectEditorElements(store),
    selected: selectSelectedElements(store),
  };
}

function mapDispatchToProps() {
  return {
    onSelectElement: selectElement,
    onSelectElements: selectElements,
    onToggleSelect: toggleElementSelection,
  };
}

const defaultPoints: [PointFromat, PointFromat] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

function ObjectSelector(props: Props) {
  const [showRect, setShowRect] = useState(false);
  const [selectorRect, setSelectorRect] = useState(defaultPoints);

  const [getBox] = useGetBoxByMultiPoints();
  const [top, left, width, height] = getBox(selectorRect);

  const handlePointerDown = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);

    const startPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([startPoint, startPoint]);
    setShowRect(true);
  };

  const handlePointerMove = (ev: any) => {
    ev.preventDefault();
    if (!showRect || props.selectionDisabled) return;
    const { clientX, clientY } = ev;
    const endPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([selectorRect[0], endPoint]);
    props.onSelectElements([selectorRect[0], endPoint]);
  };

  const handlePointerUp = (ev) => {
    ev.preventDefault();
    setShowRect(false);
  };

  const handleClick = (ev: any) => {
    const { clientX, clientY } = ev;

    if (ev.shiftKey) {
      const elements = document.elementsFromPoint(clientX, clientY);
      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          props.onToggleSelect(parseInt(id));
          break;
        }
      }
    } else {
      const elements = document.elementsFromPoint(clientX, clientY);

      for (let i = 0; i < elements.length; i++) {
        const [parent, type, id] = elements[i].id.split(".");
        if (parent === MIMIC) {
          props.onSelectElement([parseInt(id)]);
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
        // pointerEvents: "none",
        //userSelect: "none", //FIXME ???
      }}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {props.children}

      {showRect && !props.selectionDisabled && (
        <SelectionRect top={top} left={left} width={width} height={height} />
      )}
      <GroupMover />
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ObjectSelector);
