import { BoxProps } from "../../../../models/Editor";
import MovingCell from "../Primitives/MovingCell";
import ResizePoints from "../Primitives/ResizePoints";
import RotationPoint from "../Primitives/RotationPoint";

function RectangleBox({
  component,
  isSelected,
  children,
}: BoxProps): JSX.Element {
  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability } = appearance;

  const [topLeftPoint] = points;

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
      {isSelected && <RotationPoint component={component} />}

      {isSelected && <ResizePoints component={component} />}

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

      <MovingCell component />
    </div>
  );
}

RectangleBox.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
  onSetAttributes: () => {},
  onSelect: () => {},
};

export default RectangleBox;
