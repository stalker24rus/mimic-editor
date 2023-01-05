import React from "react";
import { connect } from "react-redux";
import { MimicElementProps, PointFromat } from "../../../../models/Editor";
import {
  changeElementAngle,
  endDoingChanges,
  // moveElement,
  moveElementPoints,
  resizeElement,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import MovingCell from "../Primitives/MovingCell";
import ResizePoints from "../Primitives/ResizePoints";
import RotationPoint from "../Primitives/RotationPoint";

interface StateProps {
  selected: Number[];
}

interface DispatchProps {
  onChangeAngle: Function;
  onMove: Function;
  onResize: Function;
  onStartChanges: Function;
  onEndChanges: Function;
}

interface OwnProps {
  component: MimicElementProps;
  children?: (props: any) => JSX.Element; //JSX.Element; //React.ReactElement;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    selected: store.editorState.selected,
  };
}

function mapDispatchToProps() {
  return {
    onChangeAngle: changeElementAngle,
    onMove: moveElementPoints, // moveElement,
    onResize: resizeElement,
    onStartChanges: startDoingChanges,
    onEndChanges: endDoingChanges,
  };
}

function RectangleBox(props: Props): JSX.Element {
  const { component, children, selected } = props;
  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability } = appearance;

  const [topLeftPoint] = points;
  const isSelected = selected.includes(id);

  const handleChangeAngle = (ev: React.PointerEvent<HTMLDivElement>) => {
    const point: PointFromat = {
      x: ev.pageX,
      y: ev.pageY,
    };
    props.onChangeAngle(id, point);
  };

  const handleMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const movement: PointFromat = {
      y: ev.movementY,
      x: ev.movementX,
    };
    props.onMove(id, movement);
  };

  const handleResize = (ev: React.PointerEvent<HTMLDivElement>) => {
    const pointName: string = ev.currentTarget.className;
    const point = {
      x: ev.clientX,
      y: ev.clientY,
    };
    props.onResize(id, pointName, point);
  };

  const handlePointerDown = () => {
    props.onStartChanges();
  };

  const handlePointerUp = () => {
    props.onEndChanges();
  };

  return (
    <div
      id={"mimic.button." + id}
      //className="shadow-xl" //{isSelected ? "shadow-xl" : ""} //className="shadow-xl"
      style={{
        userSelect: "none",
        position: "absolute",
        width,
        height,
        transform: ` translateX(${topLeftPoint.x}px) translateY(${
          topLeftPoint.y
        }px) rotate(${angle ? angle : 0}deg)`,
        pointerEvents: "all",
      }}
    >
      {isSelected && (
        <RotationPoint
          component={component}
          onDragMove={handleChangeAngle}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      )}

      <div
        style={{
          width,
          height,
          overflowX: "hidden",
          overflowY: "hidden",
          border: isSelected ? "1px solid white" : "none",
        }}
      >
        {children({ component })}
      </div>

      {isSelected && (
        <>
          <MovingCell
            component={component}
            onPointerMove={handleMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          />
          <ResizePoints
            component={component}
            onPointerMove={handleResize}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          />
        </>
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(RectangleBox);
