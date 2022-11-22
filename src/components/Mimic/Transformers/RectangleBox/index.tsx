import { BoxProps } from "../../../../models/mimic";
import MovingCell from "../../MovingCell";
import ResizePoints from "../../ResizePoints";
import RotationPoint from "../../RotationPoint";

function RectangleBox({
  component,
  isSelected,
  children,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onSetAttributes,
}: BoxProps): JSX.Element {
  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;
  const { fill, visability } = appearance;

  const [topLeftPoint] = points;

  const handlePointerDown = (e) => {
    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    onPointerMove(e);
  };

  const handleDragMove = (e) => {
    onPointerMove(e);
  };

  const handleSetAttributes = (e) => {
    onSetAttributes(id, e);
  };

  const baseHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
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
        <RotationPoint
          component={component}
          {...baseHandlers}
          onSetAttributes={handleSetAttributes}
        />
      )}

      {isSelected && (
        <ResizePoints
          component={component}
          {...baseHandlers}
          onSetAttributes={handleSetAttributes}
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

      <MovingCell
        component={component}
        {...baseHandlers}
        onSetAttributes={handleSetAttributes}
      />
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
