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
  children?: JSX.Element;
}

type Props = StateProps & DispatchProps & OwnProps;

/**
 *  The line box used for conteining a line element
 * */
function MultiObjectBox(props: Props): JSX.Element {
  const { component, selected, children } = props;

  const { attributes, type } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points } = position;
  const { fill, visability, strokeWidth } = appearance;

  const [getBox] = useGetBoxByMultiPoints();
  const [top, left, width, height] = getBox(points);
  const [isDragging, setIsDragging] = useState(false);

  const isSelected = selected.includes(id);

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

    const pointIndex = parseInt(target.className.split(".")[3]);
    if (pointIndex >= 0) {
      let newPoints = [...points];
      newPoints[pointIndex] = { x: cursorX, y: cursorY };
      onSetAttributes(id, { position: { points: newPoints } });
    }
  };

  const handleDragMoveLine = (event: any) => {
    const { movementX, movementY } = event;
    if (isDragging) {
      const attributes = {
        position: {
          points: points.map(function (element) {
            return {
              x: element.x + movementX,
              y: element.y + movementY,
            };
          }),
        },
      };
      onSetAttributes(id, attributes);
    }
  };

  const handlePointerDownLine = (e: any) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerUpLine = (e: any) => {
    setIsDragging(false);
  };

  //  Child component props
  const pointHandlerProps = {
    onDragMove: handleDragMovePoint,
  };

  const lineHandlerProps = {
    onPointerMove: handleDragMoveLine,
    onPointerUp: handlePointerUpLine,
    onPointerDown: handlePointerDownLine,
  };

  const innerAttributes = {
    top,
    left,
    width,
    height,
    points: points.map(function (element) {
      return {
        x: element.x - left + strokeWidth,
        y: element.y - top + strokeWidth,
      };
    }),
  };

  return (
    <span
      style={{
        top: top - strokeWidth,
        left: left - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
        position: "absolute",
      }}
    >
      {isSelected && (
        <>
          {points.map((point, index) => (
            <Point
              key={type + "." + id + "point." + index}
              className={type + "." + id + ".point." + index}
              cursorType={"pointer"}
              position={{
                top: point.y - top + strokeWidth,
                left: point.x - left + strokeWidth,
                transform: "translate(-50%, -50%)",
                width: 15,
                height: 15,
              }}
              {...pointHandlerProps}
            ></Point>
          ))}{" "}
        </>
      )}
      {children}
    </span>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(MultiObjectBox);
