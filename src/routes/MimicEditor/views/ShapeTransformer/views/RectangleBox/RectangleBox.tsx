import React, { useMemo } from "react";
import { connect } from "react-redux";
import { IMimicElement, IPoint } from "../../../../../../models/Editor";
import { useTypedDispatch } from "../../../../../../store";
import {
  changeElementAngle,
  endDoingChanges,
  // moveElement,
  moveElementPoints,
  changeElementSize,
  startDoingChanges,
} from "../../../../../../store/actionCreators/editorElements";
import MovingCell from "../Primitives/MovingCell";
import ResizePoints from "../Primitives/ResizePoints";
import RotationPoint from "../Primitives/RotationPoint";

interface StateProps {}

interface DispatchProps {
  onChangeAngle: Function;
  onMove: Function;
  onResize: Function;
  onStartChanges: Function;
  onEndChanges: Function;
}

interface OwnProps {
  component: IMimicElement;
  children?: (props: any) => JSX.Element; //JSX.Element; //React.ReactElement;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps() {
  return {
    onChangeAngle: changeElementAngle,
    onMove: moveElementPoints, // moveElement,
    onResize: changeElementSize,
    onStartChanges: startDoingChanges,
    onEndChanges: endDoingChanges,
  };
}

function RectangleBox({ component, children }): JSX.Element {
  const dispatch = useTypedDispatch();

  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability } = appearance;

  const [topLeftPoint] = points;

  const handleChangeAngle = (ev: React.PointerEvent<HTMLDivElement>) => {
    const point: IPoint = {
      x: ev.pageX,
      y: ev.pageY,
    };
    dispatch(changeElementAngle(id, point));
  };

  const handleMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const movement: IPoint = {
      y: ev.movementY,
      x: ev.movementX,
    };
    dispatch(moveElementPoints(id, movement));
  };

  const handleResize = (ev: React.PointerEvent<HTMLDivElement>) => {
    const pointName: string = ev.currentTarget.className;
    const point = {
      x: ev.clientX,
      y: ev.clientY,
    };
    dispatch(changeElementSize(id, pointName, point));
  };

  const handlePointerDown = () => {
    dispatch(startDoingChanges());
  };

  const handlePointerUp = () => {
    dispatch(endDoingChanges());
  };

  const memoComponent = useMemo(() => {
    return component;
  }, [component]);

  return (
    <div
      style={{
        userSelect: "none",
        position: "absolute",
        width,
        height,
        transform: ` translateX(${topLeftPoint.x}px) translateY(${
          topLeftPoint.y
        }px) rotate(${angle ? angle : 0}deg)`,
        pointerEvents: "all",
        border: "1px solid white",
      }}
    >
      <RotationPoint
        component={memoComponent}
        onDragMove={handleChangeAngle}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />

      <MovingCell
        component={memoComponent}
        onPointerMove={handleMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <ResizePoints
        component={memoComponent}
        onPointerMove={handleResize}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}

export default RectangleBox;
