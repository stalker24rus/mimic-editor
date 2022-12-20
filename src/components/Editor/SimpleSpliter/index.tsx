import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Splitter from "./Splitter";

//*********************-PRESENT-**************************
//
//                         1
//                       <- ->
//[------------------------|--------------------------]  W

//*********************-FUTURE-***************************
//
//                 1                   N
//               <- ->               <- ->
//[----------------|--------***--------|--------------]  W

// USEFUL INFO BY THEME
// https://github.com/yyllff/split-pane-react/blob/main/src/SplitPane.tsx

function SimpleSpliter(props: IWSplitterProps): JSX.Element {
  const { split } = props;
  const wrapper = useRef<HTMLDivElement>(null);
  const [firstChild, setFirstChild] = useState<JSX.Element>();
  const [secondChild, setSecondChild] = useState<JSX.Element | JSX.Element[]>();
  const [wrapperRect, setWrapperRect] = useState({});

  const [viewSize, setViewSize] = useState<IViewsProps>({
    first: 80,
    second: 20,
  });

  useEffect(() => {
    if (props.children.constructor === Array) {
      setFirstChild(props.children[0]);
      setSecondChild(props.children.slice(1));
    } else {
      throw "[WindowSplitter]: Invalid number of inserted children.";
    }
  }, [props.children]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setWrapperRect(wrapper?.current?.getBoundingClientRect() ?? {});
    });
    resizeObserver.observe(wrapper.current!);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleChangeView = (ev) => {
    // const rect = wrapper?.current?.getBoundingClientRect();

    const objectCur = {
      x: ev.pageX - wrapperRect["x"] ?? 0,
      y: ev.pageY - wrapperRect["y"] ?? 0,
    };

    const limitValue = (value: number, lo: number, hi: number): number => {
      if (value > hi) {
        return hi;
      }

      if (value < lo) {
        return lo;
      }
      return value;
    };

    let currentPercent = props.isHorizontally
      ? (objectCur.y / wrapperRect["height"] ?? 0) * 100
      : (objectCur.x / wrapperRect["width"] ?? 0) * 100;

    currentPercent = limitValue(currentPercent, 0.3, 99.7);

    setViewSize({
      first: currentPercent,
      second: 100 - currentPercent,
    });
  };

  return (
    <>
      <div
        className="window-splitter"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: props.isHorizontally ? "block" : "flex",
        }}
        ref={wrapper}
      >
        <Container
          percent={viewSize.first}
          isHorizontally={props.isHorizontally}
        >
          {firstChild}
        </Container>
        <Splitter
          onDrag={handleChangeView}
          isHorizontally={props.isHorizontally}
        ></Splitter>
        <Container
          percent={viewSize.second}
          isHorizontally={props.isHorizontally}
        >
          {secondChild}
        </Container>
      </div>
    </>
  );
}

SimpleSpliter.defaultProps = {
  isAutoWidth: false,
  isHorizontally: false,
  split: "vertical",
};

export default SimpleSpliter;
