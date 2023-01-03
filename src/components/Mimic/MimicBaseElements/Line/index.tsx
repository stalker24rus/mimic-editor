/**
 * The Line component draws a line on the mimic.
 * Based on SVG.
 * @param param0
 * @returns
 */

import { ELEMENT_TYPE_LINE, MIMIC } from "../../../../constants/literals";
import {
  BaseElementOutput,
  MimicElementProps,
  PointFromat,
} from "../../../../models/Editor";

interface Props {
  disablePointerEvents?: boolean;
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
  const { fill, visability, stroke, strokeWidth, opacity } = appearance;

  const [_point1, _point2]: PointFromat[] = points;
  const point1 = _point1;
  const point2 = _point2 ? _point2 : point1;

  // HANDLERS

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
          id={MIMIC + "." + ELEMENT_TYPE_LINE + "." + id}
          x1={point1.x}
          y1={point1.y}
          x2={point2.x}
          y2={point2.y}
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

export const Demo = () => {
  const demoState: MimicElementProps = {
    type: "LINE",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoPoligon",
        tagName: "",
      },
      appearance: {
        stroke: "rgba(59,130,246, 1)",
        strokeWidth: 5,
        opacity: 1,
      },

      properties: {},

      position: {
        width: 90,
        height: 90,
        top: 0,
        left: 0,
        points: [
          { x: 10, y: 10 },
          { x: 80, y: 80 },
        ],
      },

      font: {
        fontFamily: "Arial",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "normal",
        horizonAlign: "center",
      },

      action: {
        operation: "none",
        handler: undefined,
      },
    },
    children: [],
  };

  return (
    <div
      style={{
        top: demoState.attributes.appearance.strokeWidth,
        left: demoState.attributes.appearance.strokeWidth,
        position: "relative",
      }}
    >
      <Line disablePointerEvents={true} component={demoState} />
    </div>
  );
};
