import React from "react";
import { connect } from "react-redux";
import { IMimicElement, IPoint } from "../../../../models/Editor";
import {
  endDoingChanges,
  moveElementPoints,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import MovingCell from "../Primitives/MovingCell";

interface StateProps {}

interface DispatchProps {
  onMove: Function;
  onStartChanges: Function;
  onEndChanges: Function;
}

interface OwnProps {
  component: IMimicElement;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps() {
  return {
    onMove: moveElementPoints, // moveElement,

    onStartChanges: startDoingChanges,
    onEndChanges: endDoingChanges,
  };
}

function MoverBox(props: Props): JSX.Element {
  const { component } = props;
  const { attributes } = component;
  const { general, position } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;

  const [topLeftPoint] = points;

  const handleMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const movement: IPoint = {
      y: ev.movementY,
      x: ev.movementX,
    };
    props.onMove(id, movement);
  };

  const handlePointerDown = () => {
    props.onStartChanges();
  };

  const handlePointerUp = () => {
    props.onEndChanges();
  };

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
        border: "1px white solid",
      }}
    >
      <MovingCell
        component={component}
        onPointerMove={handleMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(MoverBox);
