import { ELEMENT_TYPE_POLYGON, MIMIC } from "../../../../constants/literals";
import {
  BaseElementOutput,
  MimicElementProps,
} from "../../../../models/Editor";

interface Props {
  disablePointerEvents?: boolean;
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

export const Demo = () => {
  const demoState: MimicElementProps = {
    type: "POLYGON",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoLine",
        tagName: "",
      },
      appearance: {
        stroke: "rgba(59,130,246, 1)",
        strokeWidth: 3,
        fill: "rgba(59,130,246, 0.5)",
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
          { x: 10, y: 80 },
          { x: 80, y: 80 },
          { x: 80, y: 10 },
          { x: 45, y: 45 },
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
        cursor: "pointer",
        top: demoState.attributes.appearance.strokeWidth,
        left: demoState.attributes.appearance.strokeWidth,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <Polygon disablePointerEvents={true} component={demoState} />
    </div>
  );
};
