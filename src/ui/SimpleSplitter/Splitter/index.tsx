import React, { useState } from "react";
import "./index.css";

/**
 * The Splitter is a child component for the SimpleSplitter.
 *
 * When you move the spliter you change the aspect ratio of the view.
 * Only "horizontal" or "vertical" values are allowed.
 * Vertical orientation is default value.
 * If not allowed value is inserted into the orientation field, the vertical orientation will be set by default.
 *
 * @param {number} position This is the value of the position of the splitter in the view.
 * @param {Orientation} orientation This is the orientation mode value. May contain a "horizontal" or "vertical" value.
 * @param {Function} onDrag It is called when the splitter is draged.
 * @returns  {JSX.Element}
 */
function Splitter({
  position,
  orientation,
  onDrag,
}: SplitterProps): JSX.Element {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(true);
    const target = ev.target as HTMLInputElement;
    target.setPointerCapture(ev.pointerId);
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(false);
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (isDragging) onDrag(ev);
  };

  const top: number = orientation === "horizontal" ? position | 0 : 0;
  const left: number = orientation === "horizontal" ? 0 : position | 0;
  const cssWrapperClass: string =
    orientation === "horizontal"
      ? "spliter-horizon-block "
      : "spliter-vertical-block";
  const cssBtnClass: string =
    orientation === "horizontal"
      ? "spliter-horizon-btn"
      : "spliter-vertical-btn";

  return (
    <div
      className={cssWrapperClass}
      style={{
        top,
        left,
        position: "absolute",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <div className={cssBtnClass}></div>
    </div>
  );
}

Splitter.defaultProps = {
  orientation: "vertical",
};

export default Splitter;
