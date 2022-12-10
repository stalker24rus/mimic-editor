import { useState } from "react";
import { connect } from "react-redux";
import { PointFromat } from "../../../models/Editor";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import { selectElements } from "../../../store/actionCreators/editorState";
import {
  selectSelectionDisabled,
  selectViewPosition,
} from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints from "../Hooks/useGetBoxByMultiPoints";

interface StateProps {
  viewPosition: PointFromat;
  selectionDisabled: boolean;
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
    //if (!showRect && props.selectionDisabled) return;
    const { clientX, clientY } = ev;
    const endPoint = correctPoint(
      { x: clientX, y: clientY },
      props.viewPosition
    );
    setSelectorRect([selectorRect[0], endPoint]);
    if (showRect) {
      props.onSelectElements([selectorRect[0], endPoint]);
    }
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
      {showRect && !props.selectionDisabled && (
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

/*

import { useState } from "react";
import { connect } from "react-redux";
import { PointFromat } from "../../../models/Editor";
import { correctPoint } from "../../../store/actionCreators/editorElements";
import { selectElements } from "../../../store/actionCreators/editorState";
import {
  selectSelectionDisabled,
  selectSelectorRect,
  selectViewPosition,
} from "../../../store/selectors/editorState";
import useGetBoxByMultiPoints from "../Hooks/useGetBoxByMultiPoints";

interface StateProps {
  viewPosition: PointFromat;
  selectionDisabled: boolean;
  selectorRect: [PointFromat, PointFromat];
}

interface DispatchProps {
  onSelectElements: Function;
  //onSetSelectRect: Function;
}

interface OwnProps {
  children?: React.ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    viewPosition: selectViewPosition(store),
    selectionDisabled: selectSelectionDisabled(store),
    selectorRect: selectSelectorRect(store),
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
  const [top, left, width, height] = getBox(props.selectorRect);

  const handlePointerDown = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);
    setShowRect(true);

    props.onSetSelectRect([
      { x: clientX, y: clientY },
      { x: clientX, y: clientY },
    ]);
  };

  const handlePointerMove = (ev: any) => {
    if (!showRect) return;
    const { clientX, clientY } = ev;
    props.onSetSelectRect([props.selectorRect[0], { x: clientX, y: clientY }]);
    props.onSelectElements([props.selectorRect[0], { x: clientX, y: clientY }]);
  };

  const handlePointerUp = () => {
    setShowRect(false);
    props.onSetSelectRect(defaultPoints);
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
      {showRect && !props.selectionDisabled && (
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



*/
