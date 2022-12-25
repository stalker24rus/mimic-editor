import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Splitter from "./Splitter";

/**
 * The SimpleSplitter splits a view into two parts with splitter.
 * When you drag the divider, the aspect ratio changes.
 *
 * @param {Orientation} orientation This is the orientation mode value. May contain a "horizontal" or "vertical" value.
 * @param {number} defaultRatio This is the default aspect ratio, %.
 * @param {JSX.Element | JSX.Element[]} children
 * @returns {JSX.Element}
 */
function SimpleSplitter(props: SimpleSplitterProps): JSX.Element {
  const { orientation, defaultRatio, children } = props;
  const [firstChild, setFirstChild] = useState<JSX.Element>();
  const [secondChildren, setSecondChildren] = useState<
    JSX.Element | JSX.Element[]
  >();

  const [viewRatio, setViewRatio] = useState<number>(defaultRatio);

  const wrapper = useRef<HTMLDivElement>(null);
  const [wrapperState, setWrapperState] = useState({});

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const newWrapperState = wrapper?.current?.getBoundingClientRect();
      setWrapperState(newWrapperState ?? {});
    });
    resizeObserver.observe(wrapper.current!);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (children.constructor === Array) {
      setFirstChild(children[0]);
      setSecondChildren(children.slice(1));
    } else {
      throw "[WindowSplitter]: Invalid number of inserted children.";
    }
  }, [children]);

  const handleDrag = (ev: React.PointerEvent<HTMLDivElement>) => {
    const cursor = {
      x: ev.pageX - wrapperState["x"] ?? 0,
      y: ev.pageY - wrapperState["y"] ?? 0,
    };

    let newRatio =
      orientation === "horizontal"
        ? (cursor.y / wrapperState["height"] ?? 0) * 100
        : orientation === "vertical"
        ? (cursor.x / wrapperState["width"] ?? 0) * 100
        : undefined;
    newRatio = limitValue(newRatio, 0.3, 99.7);
    setViewRatio(newRatio);
  };

  const spliterRatio =
    orientation === "horizontal"
      ? wrapperState["height"] * (viewRatio / 100)
      : orientation === "vertical"
      ? wrapperState["width"] * (viewRatio / 100)
      : 0;

  return (
    <>
      <div
        ref={wrapper}
        className="window-splitter"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display:
            orientation === "horizontal"
              ? "block"
              : orientation === "vertical"
              ? "flex"
              : "none",
        }}
      >
        <Container slice={viewRatio} orientation={orientation}>
          {firstChild}
        </Container>
        <Container slice={100 - viewRatio} orientation={orientation}>
          {secondChildren}
        </Container>
        <Splitter
          position={spliterRatio}
          orientation={orientation}
          onDrag={handleDrag}
        ></Splitter>
      </div>
    </>
  );
}

SimpleSplitter.defaultProps = {
  isAutoWidth: false,
  defaultRatio: 70,
  orientation: "vertical",
};

export default SimpleSplitter;

const limitValue = (value: number, lo: number, hi: number): number => {
  if (value > hi) {
    return hi;
  }

  if (value < lo) {
    return lo;
  }
  return value;
};
