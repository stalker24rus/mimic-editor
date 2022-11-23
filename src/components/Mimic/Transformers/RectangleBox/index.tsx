import { FC } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../../../models/Editor";
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
  children: JSX.Element | JSX.Element[];
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

  const handleChangeAngle = (ev) => {
    props.onChangeAngle(ev);
  };

  const handleMove = (ev) => {
    props.onMove(ev);
  };

  const handleResize = (ev) => {
    props.onResize(ev);
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
        <RotationPoint component={component} onMove={handleChangeAngle} />
      )}

      {isSelected && (
        <ResizePoints component={component} onMove={handleResize} />
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

      <MovingCell component={component} onMove={handleMove} />
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(RectangleBox);
