import { useMemo, useState } from "react";
import { IPoint } from "../../../../../../models/Editor";

import {
  changePointPosition,
  endDoingChanges,
  moveElementPoints,
  startDoingChanges,
} from "../../../../../../store/actionCreators/editorElements";
import useGetBoxByMultiPoints from "../../../../../../hooks/useGetBoxByMultiPoints";
import Point from "../Primitives/Point";
import { useTypedDispatch } from "../../../../../../store";

function MultiObjectBox({ component }): JSX.Element {
  const dispatch = useTypedDispatch();

  const { attributes, type } = component;
  const { general, position, appearance } = attributes;
  const { id } = general;
  const { points } = position;
  const { strokeWidth } = appearance;

  const [getBox] = useGetBoxByMultiPoints();
  const [top, left, width, height] = getBox(points);
  const [isDragging, setIsDragging] = useState(false);

  // The points view handlers
  const handlePointDragMove = (ev: any) => {
    const { target, pointerId, clientX, clientY } = ev;
    target.setPointerCapture(pointerId);

    const pointNo = parseInt(target.className.split(".")[3]);
    if (pointNo >= 0) {
      const point: IPoint = { x: clientX, y: clientY };
      dispatch(changePointPosition(id, pointNo, point));
    }
  };

  const handlePointPointerDown = () => {
    dispatch(startDoingChanges());
  };

  const handlePointPointerUp = () => {
    dispatch(endDoingChanges());
  };

  // The child object handlers
  const handleObjDragMove = (ev: any) => {
    if (isDragging) {
      const { movementX, movementY } = ev;
      const movement: IPoint = {
        x: movementX,
        y: movementY,
      };
      dispatch(moveElementPoints(id, movement));
    }
  };

  const handleObjPointerDown = (e: any) => {
    setIsDragging(true);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    dispatch(startDoingChanges());
  };

  const handleObjPointerUp = (e: any) => {
    setIsDragging(false);
    dispatch(endDoingChanges());
  };

  const memoPoints = useMemo(
    () =>
      points.map((point, index) => (
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
      )),
    [top, left, strokeWidth, component]
  );

  return (
    <div
      style={{
        top: top - strokeWidth,
        left: left - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
        position: "absolute",
        border: "1px solid white",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          top: top,
          left: left,
          width: width + strokeWidth * 2,
          height: height + strokeWidth * 2,
          pointerEvents: "auto",
          cursor: "move",
        }}
        onPointerMove={handleObjDragMove}
        onPointerDown={handleObjPointerDown}
        onPointerUp={handleObjPointerUp}
      />
      {memoPoints}
    </div>
  );
}

export default MultiObjectBox;
