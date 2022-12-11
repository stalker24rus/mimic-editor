import { useState } from "react";
import { connect } from "react-redux";
import { MimicElementProps, PointFromat } from "../../../models/Editor";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import { selectElements } from "../../../store/actionCreators/editorState";
import { selectEditorElements } from "../../../store/selectors/editorElements";
import {
  selectSelectedElements,
  selectSelectionDisabled,
  selectViewPosition,
} from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints, {
  useGetBoxFromElements,
} from "../Hooks/useGetBoxByMultiPoints";

interface StateProps {
  viewPosition: PointFromat;
  selectionDisabled: boolean;
  selected: number[];
  elements: MimicElementProps[];
}

interface DispatchProps {
  onSelectElements: Function;
  //setSelectorRect: Function;
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
    onSelectElements: selectElements,
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

  const [getBoxFromElements] = useGetBoxFromElements();

  const selectedElements = props.elements.filter((element) => {
    return props.selected.indexOf(element.attributes.general.id) !== -1;
  });

  const [topArea, leftArea, widthArea, heightArea] =
    getBoxFromElements(selectedElements);

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
    if (!showRect || props.selectionDisabled) return;
    const { clientX, clientY } = ev;
    const endPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([selectorRect[0], endPoint]);
    props.onSelectElements([selectorRect[0], endPoint]);
  };

  const handlePointerUp = () => {
    setShowRect(false);
    //setSelectorRect(defaultPoints);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {props.children}

      {selectedElements.length > 1 && (
        // TODO <SelectedRect />
        <div
          style={{
            top: topArea,
            left: leftArea,
            width: widthArea,
            height: heightArea,
            //background: "#1E90FF",
            position: "absolute",
            //opacity: 0.3,
            border: "2px solid green",
            cursor: "move",
          }}
        >
          {" "}
        </div>
      )}

      {showRect && !props.selectionDisabled && (
        // TODO <SelectionRect />
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
          }}
        >
          {" "}
        </div>
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ObjectSelector);
