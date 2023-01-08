import { useState } from "react";
import { connect } from "react-redux";
import { IMimicElement, IPoint } from "../../../../models/Editor";
import {
  endDoingChanges,
  moveElementGroup,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import { selectEditorElements } from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import { useGetBoxFromElements } from "../../../Hooks/useGetBoxByMultiPoints";

interface StateProps {
  selected: number[];
  elements: IMimicElement[];
}

interface DispatchProps {
  onGroupMove: Function;
  onStartChanges: Function;
  onEndChanges: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: selectEditorElements(store),
    selected: selectSelectedElements(store),
  };
}

function mapDispatchToProps() {
  return {
    onGroupMove: moveElementGroup,
    onStartChanges: startDoingChanges,
    onEndChanges: endDoingChanges,
  };
}

const BORDER: number = 10;

function GroupMover(props: Props): JSX.Element {
  const [isDragging, setIsDragging] = useState(false);

  const [getBoxFromElements] = useGetBoxFromElements();

  const selectedElements = props.elements.filter((element) => {
    return props.selected.indexOf(element.attributes.general.id) !== -1;
  });

  const [top, left, width, height] = getBoxFromElements(selectedElements);

  const handlePointerDown = (ev) => {
    const { target, pointerId } = ev;
    target.setPointerCapture(pointerId);
    setIsDragging(true);
    props.onStartChanges();
  };

  const handlePointerMove = (ev) => {
    if (isDragging) {
      const { movementX, movementY } = ev;
      const movement: IPoint = {
        x: movementX,
        y: movementY,
      };
      props.onGroupMove(movement); // props.onGroupMove(props.selected, movement);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    props.onEndChanges();
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

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(GroupMover);
