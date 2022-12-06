/**
 * The Line component draws a line on the mimic.
 * Based on SVG.
 * @param param0
 * @returns
 */

import { MimicElementProps, PointFromat } from "../../../../models/Editor";

interface Props {
  component: MimicElementProps;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

function Line(props: Props): JSX.Element {
  // INCOMING STATES

  const { attributes } = props.component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, top, left } = position;
  const { fill, visability, stroke, strokeWidth } = appearance;

  const [_point1, _point2]: PointFromat[] = points;
  const point1 = _point1;
  const point2 = _point2 ? _point2 : point1;

  // HANDLERS

  const handlePointerMove = (event: React.PointerEvent<SVGLineElement>) => {
    props.onPointerMove(event);
  };

  const handlePointerUp = (event: React.PointerEvent<SVGLineElement>) => {
    props.onPointerUp(event);
  };

  const handlePointerDown = (event: React.PointerEvent<SVGLineElement>) => {
    props.onPointerDown(event);
  };

  return (
    <span
      style={{
        top: top - strokeWidth,
        left: left - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
      }}
    >
      <svg
        x={strokeWidth}
        y={strokeWidth}
        height={height + strokeWidth * 2}
        width={width + strokeWidth * 2}
        pointerEvents="none"
      >
        <line
          id={"mimic.line." + id}
          x1={point1.x}
          y1={point1.y}
          x2={point2.x}
          y2={point2.y}
          style={{
            stroke: stroke,
            strokeWidth: strokeWidth,
            cursor: "move",
            pointerEvents: "stroke",
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        />
      </svg>
    </span>
  );
}

Line.defaultProps = {
  onDragMove: () => {},
  onClick: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default Line;
