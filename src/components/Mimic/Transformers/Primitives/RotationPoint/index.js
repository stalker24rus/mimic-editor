import Point from "../Point";

const rotation = "rotation";

function RotationPoint({
  component,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onSetAttributes,
}) {
  const { attributes } = component;
  const { position } = attributes;
  const { width, height, points } = position;

  const [topLeftPoint] = points;

  const handlePointerDown = (e) => {
    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    onPointerMove(e);
  };

  const handleDragMove = (e) => {
    let boxCenter = {
      x: topLeftPoint.x + width / 2,
      y: topLeftPoint.y + height / 2,
    };

    let angle =
      Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
      (180 / Math.PI);

    onSetAttributes({
      position: {
        angle: angle > 179.5 || angle < -179.5 ? 180 : Math.trunc(angle),
      },
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
      }}
    >
      <Point
        className={rotation}
        cursorType={"pointer"}
        position={{
          top: "-30px",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: 15,
          height: 15,
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onDragMove={handleDragMove}
      />
    </div>
  );
}

RotationPoint.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default RotationPoint;

/*
    let box = document.querySelector(".box");
    let boxBoundingRect = box.getBoundingClientRect();
    let boxCenter= {
        x: boxBoundingRect.left + boxBoundingRect.width/2, 
        y: boxBoundingRect.top + boxBoundingRect.height/2
    };

    document.addEventListener("mousemove", e => {
        let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);      
        box.style.transform = `rotate(${angle}deg)`;  
    })
*/
