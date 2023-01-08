import { ELEMENT_TYPE_POLYLINE, MIMIC } from "../../../../constants/literals";
import { BaseElementOutput, IMimicElement } from "../../../../models/Editor";
import useGetBoxByMultiPoints from "../../Hooks/useGetBoxByMultiPoints";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

function Polyline(props: Props): JSX.Element {
  // INCOMING STATES
  const { attributes } = props.component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points } = position;
  const [getBox] = useGetBoxByMultiPoints();
  const [boxTop, boxLeft, boxWidth, boxHeight] = getBox(points);

  const { fill, visability, stroke, strokeWidth, opacity } = appearance;

  // HANDLERS

  const handlePointerMove = (ev: React.PointerEvent<SVGPolylineElement>) => {
    props.onPointerMove(ev);
  };

  const handlePointerUp = (ev: React.PointerEvent<SVGPolylineElement>) => {
    props.onPointerUp(ev);
  };

  const handlePointerDown = (ev: React.PointerEvent<SVGPolylineElement>) => {
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
        <polyline
          id={MIMIC + "." + ELEMENT_TYPE_POLYLINE + "." + id}
          points={polinePointsFormat}
          fill="none"
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

Polyline.defaultProps = {
  onDragMove: () => {},
  onClick: () => {},
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default Polyline;

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
  const demoState: IMimicElement = {
    type: "POLYLINE",
    attributes: {
      general: {
        id: 99999999,
        name: "DemoPoliline",
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
          { x: 5, y: 70 },
          { x: 65, y: 15 },
          { x: 85, y: 70 },
          { x: 30, y: 70 },
          { x: 60, y: 40 },
          { x: 70, y: 65 },
          // { x: 80, y: 80 },
          // { x: 80, y: 10 },
          // { x: 45, y: 45 },
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
        height: "90px",
        width: "90px",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <Polyline disablePointerEvents={true} component={demoState} />
    </div>
  );
};
