import { useState } from "react";
import "./index.css";

function Splitter({ isHorizontally, onDrag }) {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (ev) => {
    setIsDragging(true);
    const target = ev.target;
    target.setPointerCapture(ev.pointerId);
  };

  const handlePointerUp = (ev) => {
    setIsDragging(false);
  };

  const handlePointerMove = (ev) => {
    if (isDragging) onDrag(ev);
  };

  return (
    <div
      className={
        isHorizontally ? "spliter-horizon-block " : "spliter-vertical-block"
      }
    >
      <div
        className={
          isHorizontally ? "spliter-horizon-btn" : "spliter-vertical-btn"
        }
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      ></div>
    </div>
  );
}

Splitter.defaultProps = {
  isHorizontally: false,
};

export default Splitter;
