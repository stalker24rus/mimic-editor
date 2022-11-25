import { MimicElementProps } from "../../../../../models/Editor";
import Point from "../Point";

interface Props {
  component: MimicElementProps;
  onPointerDown: Function;
  onPointerUp: Function;
  onPointerMove: Function;
  onDragMove: Function;
}

function RotationPoint({
  component,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onDragMove,
}: Props): JSX.Element {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points } = position;

  const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp(ev);
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove(ev);
  };

  const handleDragMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    onDragMove(ev);
  };

  const positionProps = {
    top: "-30px",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: 15,
    height: 15,
  };

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
      }}
    >
      <Point
        className="rotation"
        cursorType="pointer"
        position={positionProps}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onDragMove={handleDragMove}
      />
    </div>
  );
}

RotationPoint.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
  onDragMove: () => {},
};

export default RotationPoint;

// let boxCenter = {
//   x: topLeftPoint.x + width / 2,
//   y: topLeftPoint.y + height / 2,
// };

// let angle =
//   Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
//   (180 / Math.PI);

// onSetAttributes({
//   position: {
//     angle: angle > 179.5 || angle < -179.5 ? 180 : Math.trunc(angle),
//   },
// });
