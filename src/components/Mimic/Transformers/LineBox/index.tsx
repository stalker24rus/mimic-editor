import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../../../models/Editor";
import { BoxProps } from "../../../../models/mimic";
import useGetBoxByMultiPoints from "../../../CustomHooks/useGetBoxByMultiPoints";
import { MIMIC_FRAME_ID } from "../../../MimicCanvas/Canvas";
import Point from "../../Point";

interface StateProps {
  selected: Number[];
}

interface DispatchProps {
  onChangeAngle: Function;
  onMove: Function;
  onResize: Function;
  onStartChanges: Function;
}

interface OwnProps {
  component: MimicElementProps;
  children?: React.ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    selected: store.editorState.selected,
  };
}

function mapDispatchToProps() {
  return {
    onChangePoint: changePoint,
  };
}

const POINT_1 = "point1";
const POINT_2 = "point2";

/**
 *  The line box used for conteining a line element
 * */
function LineBox(props: Props): JSX.Element {

  const {
    component,
    selected
    children,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    
    onSetAttributes,
  } = props;

  const { attributes } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points, angle } = position;
  const { fill, visability, strokeWidth } = appearance;

  const [point1, point2] = points;

  const _point1 = point1;
  const _point2 = point2 ? point2 : point1;

  const [updateState, setUpdateState] = useState(0);

  useEffect(() => {
    setUpdateState(updateState + 1);
  }, [point1, point2]);

  const [getBox] = useGetBoxByMultiPoints();
  const [top, left, width, height] = getBox(points);
  const [isDragging, setIsDragging] = useState(false);

  const isSelected = selected.includes(id);

  // Move points
  const handlePointerDown = (e: React.SyntheticEvent) => {
    onPointerDown(e);
  };

  const handlePointerUp = (e: React.SyntheticEvent) => {
    onPointerUp(e);
  };

  const handlePointerMove = (e: React.SyntheticEvent) => {
    onPointerMove(e);
  };

  const handleDragMovePoint = (event: {
    target: any;
    pointerId: any;
    clientX: any;
    clientY: any;
  }) => {
    const target = event.target;
    target.setPointerCapture(event.pointerId);

    // Do some correction for cursor coordinates
    const { left, top } = document
      .getElementById(MIMIC_FRAME_ID)
      .getBoundingClientRect();
    const cursorX = event.clientX - left;
    const cursorY = event.clientY - top;

    const points = [
      {
        x: target.className === POINT_1 ? cursorX : _point1.x,
        y: target.className === POINT_1 ? cursorY : _point1.y,
      },
      {
        x: target.className === POINT_2 ? cursorX : _point2.x,
        y: target.className === POINT_2 ? cursorY : _point2.y,
      },
    ];

    onSetAttributes(id, { position: { points } });
  };

  // SVG Element handlers
  const handlePointerDownLine = (e: any) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerUpLine = (e: any) => {
    setIsDragging(false);
  };

  const handleDragMoveLine = (e: any) => {
    if (isDragging) {
      const attributes = {
        position: {
          points: [
            { x: _point1.x + e.movementX, y: _point1.y + e.movementY },
            { x: _point2.x + e.movementX, y: _point2.y + e.movementY },
          ],
        },
      };
      onSetAttributes(id, attributes);
    }
  };

  // Child component props
  const pointHandlerProps = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerMove: handlePointerMove,
    onDragMove: handleDragMovePoint,
  };

  const lineHandlerProps = {
    //onClick: handleClick,
    onPointerMove: handleDragMoveLine,
    onPointerUp: handlePointerUpLine,
    onPointerDown: handlePointerDownLine,
  };

  const innerAttributes = {
    top,
    left,
    width,
    height,
    points: [
      { x: _point1.x - left + strokeWidth, y: _point1.y - top + strokeWidth },
      { x: _point2.x - left + strokeWidth, y: _point2.y - top + strokeWidth },
    ],
  };

  return (
    <span
      // id={"mimic.line." + id}
      style={{
        top: top - strokeWidth,
        left: left - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
        position: "absolute",
        // border: isSelected ? "1px solid white" : "none",
        // userSelect: "none",
      }}
    >
      {isSelected && (
        <span>
          <Point
            className={POINT_1}
            cursorType={"pointer"}
            position={{
              top: _point1.y - top + strokeWidth,
              left: _point1.x - left + strokeWidth,
              transform: "translate(-50%, -50%)",
              width: 15,
              height: 15,
            }}
            {...pointHandlerProps}
          />

          <Point
            className={POINT_2}
            cursorType={"pointer"}
            position={{
              top: _point2.y - top + strokeWidth,
              left: _point2.x - left + strokeWidth,
              transform: "translate(-50%, -50%)",
              width: 15,
              height: 15,
            }}
            {...pointHandlerProps}
          />
        </span>
      )}

      {children({
        component: {
          ...component,
          attributes: {
            ...component.attributes,
            position: { ...innerAttributes },
          },
        },
        ...lineHandlerProps,
      })}
    </span>
  );
}


export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(LineBox);
