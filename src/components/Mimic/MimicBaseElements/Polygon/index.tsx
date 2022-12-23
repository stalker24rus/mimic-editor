import { ELEMENT_TYPE_POLYGON, MIMIC } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  component: MimicElementProps;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

function Polygon(props: Props): JSX.Element {
  // INCOMING STATES
  const { attributes } = props.component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, width, height, top, left } = position;
  const { fill, visability, stroke, strokeWidth, opacity } = appearance;

  // HANDLERS

  const handlePointerMove = (ev: React.PointerEvent<SVGPolygonElement>) => {
    props.onPointerMove(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<SVGPolygonElement>) => {
    props.onPointerUp(ev);
  };

  const handlePointerDown = (ev: React.PointerEvent<SVGPolygonElement>) => {
    props.onPointerDown(ev);
  };

  const polinePointsFormat: string = points
    .map(function (point) {
      return `${point.x}, ${point.y}`;
    })
    .join();

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
        <polygon
          id={MIMIC + "." + ELEMENT_TYPE_POLYGON + "." + id}
          points={polinePointsFormat}
          style={{
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            cursor: "move",
            pointerEvents: "visibleFill",
            opacity: opacity,
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        />
      </svg>
    </span>
  );
}

Polygon.defaultProps = {
  onDragMove: () => {},
  onClick: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default Polygon;
