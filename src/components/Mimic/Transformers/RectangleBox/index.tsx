import { FC } from "react";
import { connect } from "react-redux";
import { MimicElementProps, PointFromat } from "../../../../models/Editor";
import {
  changeElementAngle,
  moveElement,
  resizeElement,
} from "../../../../store/actionCreators/editorElements";
import MovingCell from "../Primitives/MovingCell";
import ResizePoints from "../Primitives/ResizePoints";
import RotationPoint from "../Primitives/RotationPoint";

interface StateProps {}

interface DispatchProps {
  onChangeAngle: Function;
  onMove: Function;
  onResize: Function;
}

interface OwnProps {
  component: MimicElementProps;
  children?: React.ReactNode;
  isSelected: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps() {
  return {
    onChangeAngle: changeElementAngle,
    onMove: moveElement,
    onResize: resizeElement,
  };
}

function RectangleBox(props: Props): JSX.Element {
  const { component, children, isSelected } = props;
  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability } = appearance;

  const [topLeftPoint] = points;

  const handleChangeAngle = (ev: React.PointerEvent<HTMLDivElement>) => {
    const point: PointFromat = {
      x: ev.pageX,
      y: ev.pageY,
    };
    props.onChangeAngle(id, point);
  };

  const handleMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const pointName: string = ev.currentTarget.className;
    const point: PointFromat = {
      x: ev.clientX,
      y: ev.clientY,
    };
    props.onMove(id, pointName, point);
  };

  const handleResize = (ev: React.PointerEvent<HTMLDivElement>) => {
    const point = {
      y: topLeftPoint.y + ev.movementY,
      x: topLeftPoint.x + ev.movementX,
    };
    props.onResize(id, point);
  };

  return (
    <div
      id={"mimic.button." + id}
      className="shadow-xl" //{isSelected ? "shadow-xl" : ""} //className="shadow-xl"
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
        <RotationPoint component={component} onDragMove={handleChangeAngle} />
      )}

      {isSelected && (
        <ResizePoints component={component} onPointerMove={handleResize} />
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
        {children}
      </div>

      {isSelected && (
        <MovingCell component={component} onPointerMove={handleMove} />
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(RectangleBox);
