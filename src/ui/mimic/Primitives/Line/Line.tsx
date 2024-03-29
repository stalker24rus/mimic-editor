/**
 * The Line component draws a line on the mimic.
 * Based on SVG.
 * @param param0
 * @returns
 */

import { ELEMENT_TYPE_LINE, MIMIC } from "../../../../constants/literals";
import {
  BaseElementOutput,
  IMimicElement,
  IPoint,
} from "../../../../models/Editor";
import useGetBoxByMultiPoints from "../../../../hooks/useGetBoxByMultiPoints";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

function Line(props: Props): JSX.Element {
  const { attributes } = props.component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points } = position;

  const [getBox] = useGetBoxByMultiPoints();
  const [boxTop, boxLeft, boxWidth, boxHeight] = getBox(points);

  const { stroke, strokeWidth, opacity } = appearance;
  const [_point1, _point2]: IPoint[] = points;
  const point1 = _point1;
  const point2 = _point2 ? _point2 : point1;

  const handlePointerMove = (ev: React.PointerEvent<SVGLineElement>) => {
    props.onPointerMove(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<SVGLineElement>) => {
    props.onPointerUp(ev);
  };

  const handlePointerDown = (ev: React.PointerEvent<SVGLineElement>) => {
    props.onPointerDown(ev);
  };

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
        <line
          id={MIMIC + "." + ELEMENT_TYPE_LINE + "." + id}
          x1={point1.x - boxLeft}
          y1={point1.y - boxTop}
          x2={point2.x - boxLeft}
          y2={point2.y - boxTop}
          style={{
            stroke: stroke,
            strokeWidth: strokeWidth,
            cursor: "move",
            pointerEvents: props.disablePointerEvents ? "none" : "stroke",
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

Line.defaultProps = {
  onDragMove: () => {},
  onClick: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default Line;

export const startState: BaseElementOutput = {
  attributes: {
    appearance: {
      stroke: "rgb(255, 0, 0)",
      strokeWidth: 5,
      opacity: 1,
    },
    properties: {},
    position: {
      points: [],
    },
    animation: [],
  },
};
