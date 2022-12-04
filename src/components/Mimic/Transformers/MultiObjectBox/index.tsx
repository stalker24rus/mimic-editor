import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MimicElementProps, PointFromat } from "../../../../models/Editor";
import { BoxProps } from "../../../../models/mimic";
import {
  changePointPosition,
  moveElement,
  moveElementPoints,
} from "../../../../store/actionCreators/editorElements";
import useGetBoxByMultiPoints from "../../../CustomHooks/useGetBoxByMultiPoints";
import { MIMIC_FRAME_ID } from "../../../MimicCanvas/Canvas";
import Point from "../../Point";

interface StateProps {
  selected: Number[];
}

interface DispatchProps {
  onChangePointPosition: Function;
  onMoveElementPoints: Function;
}

interface OwnProps {
  component: MimicElementProps;
  children?: JSX.Element;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    selected: store.editorState.selected,
  };
}

function mapDispatchToProps() {
  return {
    onChangeAngle: changePointPosition,
    onMoveElementPoints: moveElementPoints,
  };
}

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

  const handleDragMovePoint = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);

    const pointNo = parseInt(target.className.split(".")[3]);
    if (pointNo >= 0) {
      const point: PointFromat = { x: clientX, y: clientY };
      props.onChangePointPosition(id, pointNo, point);
    }
  };

  const handleDragMoveLine = (ev: any) => {
    if (isDragging) {
      const { movementX, movementY } = ev;
      const movement: PointFromat = {
        x: movementX,
        y: movementY,
      };
      props.onMoveElementPoints(id, movement);
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
