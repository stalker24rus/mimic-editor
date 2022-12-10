import lodash from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import { MimicElementProps, PointFromat } from "../../../../models/Editor";

import {
  changePointPosition,
  endDoingChanges,
  moveElementPoints,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import useGetBoxByMultiPoints from "../../Hooks/useGetBoxByMultiPoints";
import Point from "../Primitives/Point";

interface StateProps {
  selected: Number[];
}

interface DispatchProps {
  onChangePointPosition: Function;
  onMoveElementPoints: Function;
  onStartChanges: Function;
  onEndChanges: Function;
}

interface OwnProps {
  component: MimicElementProps;
  children?: (props: any) => JSX.Element; //JSX.Element; //React.ReactElement;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    selected: store.editorState.selected,
  };
}

function mapDispatchToProps() {
  return {
    onChangePointPosition: changePointPosition,
    onMoveElementPoints: moveElementPoints,
    onStartChanges: startDoingChanges,
    onEndChanges: endDoingChanges,
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

  // The points view handlers
  const handlePointDragMove = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);

    const pointNo = parseInt(target.className.split(".")[3]);
    if (pointNo >= 0) {
      const point: PointFromat = { x: clientX, y: clientY };
      props.onChangePointPosition(id, pointNo, point);
    }
  };

  const handlePointPointerDown = () => {
    props.onStartChanges();
  };

  const handlePointPointerUp = () => {
    props.onEndChanges();
  };

  // The child object handlers
  const handleObjDragMove = (ev: any) => {
    if (isDragging) {
      const { movementX, movementY } = ev;
      const movement: PointFromat = {
        x: movementX,
        y: movementY,
      };
      props.onMoveElementPoints(id, movement);
    }
  };

  const handleObjPointerDown = (e: any) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    props.onStartChanges();
  };

  const handleObjPointerUp = (e: any) => {
    setIsDragging(false);
    props.onEndChanges();
  };

  //  Child component props

  const lineHandlerProps = {
    onPointerMove: handleObjDragMove,
    onPointerUp: handleObjPointerUp,
    onPointerDown: handleObjPointerDown,
  };

  const adaptedComponent = lodash.cloneDeep(component);
  adaptedComponent.attributes.position = {
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
    <div
      style={{
        top: top - strokeWidth,
        left: left - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
        position: "absolute",
        border: isSelected ? "1px solid white" : "none",
        //background: "green",
      }}
    >
      {children({ component: adaptedComponent, ...lineHandlerProps })}
      {isSelected && (
        <>
          {points.map((point, index) => (
            <div>
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
                onDragMove={handlePointDragMove}
                onPointerDown={handlePointPointerDown}
                onPointerUp={handlePointPointerUp}
              />
            </div>
          ))}{" "}
        </>
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(MultiObjectBox);