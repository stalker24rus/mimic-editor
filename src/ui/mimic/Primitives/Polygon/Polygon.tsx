import { ELEMENT_TYPE_POLYGON, MIMIC } from "../../../../constants/literals";
import { BaseElementOutput, IMimicElement } from "../../../../models/Editor";
import useGetBoxByMultiPoints from "../../../../hooks/useGetBoxByMultiPoints";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

function Polygon(props: Props): JSX.Element {
  // INCOMING STATES
  const { attributes } = props.component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points } = position;

  const [getBox] = useGetBoxByMultiPoints();
  const [boxTop, boxLeft, boxWidth, boxHeight] = getBox(points);

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
      return `${point.x - boxLeft}, ${point.y - boxTop}`;
    })
    .join();

  return (
    <span
      style={{
        top: boxTop,
        left: boxLeft,
        width: boxWidth,
        height: boxHeight,
        position: "absolute",
        pointerEvents: "none",
      }}
    >
      <svg
        x={0}
        y={0}
        width={boxWidth}
        height={boxHeight}
        overflow="visible"
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
            pointerEvents: props.disablePointerEvents ? "none" : "visibleFill",
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

export const startState: BaseElementOutput = {
  attributes: {
    appearance: {
      stroke: "rgb(255, 0, 0)",
      strokeWidth: 5,
      fill: "#B8A5A1",
      opacity: 1,
    },
    properties: {},
    position: {
      points: [],
    },
    animation: [],
  },
};
