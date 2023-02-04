import React from "react";
import { IMimicElement, IPoint } from "../../../../models/Editor";
import { useTypedDispatch } from "../../../../store";
import {
  endDoingChanges,
  moveElementPoints,
  startDoingChanges,
} from "../../../../store/actionCreators/editorElements";
import MovingCell from "../Primitives/MovingCell";

interface Props {
  component: IMimicElement;
}

export default function MoverBox(props: Props): JSX.Element {
  const dispatch = useTypedDispatch();

  const { component } = props;
  const { attributes } = component;
  const { general, position } = attributes;
  const { id } = general;
  const { points, width, height, angle } = position;

  const [topLeftPoint] = points;

  const handleMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const movement: IPoint = {
      y: ev.movementY,
      x: ev.movementX,
    };
    dispatch(moveElementPoints(id, movement));
  };

  const handlePointerDown = () => {
    dispatch(startDoingChanges());
  };

  const handlePointerUp = () => {
    dispatch(endDoingChanges());
  };

  return (
    <div
      style={{
        userSelect: "none",
        position: "absolute",
        width,
        height,
        transform: ` translateX(${topLeftPoint.x}px) translateY(${
          topLeftPoint.y
        }px) rotate(${angle ? angle : 0}deg)`,
        pointerEvents: "all",
        border: "1px white solid",
      }}
    >
      <MovingCell
        component={component}
        onPointerMove={handleMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}
