import { useState } from "react";
import { connect } from "react-redux";
import { PointFromat } from "../../../models/Editor";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import { selectViewPosition } from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints from "../Hooks/useGetBoxByMultiPoints";

interface StateProps {
  viewPosition: PointFromat;
}

interface DispatchProps {
  setSelectorRect: Function;
}

interface OwnProps {
  children?: React.ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    viewPosition: selectViewPosition(store),
  };
}

function mapDispatchToProps() {
  return {
    setSelectorRect: () => {},
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
    setShowRect(true);

    const startPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([startPoint, startPoint]);
    console.log(ev);
  };

  const handlePointerMove = (ev: any) => {
    const { clientX, clientY } = ev;
    const endPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([selectorRect[0], endPoint]);
  };

  const handlePointerUp = () => {
    setShowRect(false);
    setSelectorRect(defaultPoints);
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
      {showRect && (
        <div
          style={{
            top,
            left,
            width,
            height,
            background: "#1E90FF",
            position: "relative",
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
