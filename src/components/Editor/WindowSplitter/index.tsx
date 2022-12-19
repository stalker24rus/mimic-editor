import { useEffect, useState } from "react";
import Container from "./Container";
import Splitter from "./Splitter";

interface Props {
  children: JSX.Element | JSX.Element[];
  isAutoWidth: boolean | undefined;
  isHorizontally: boolean | undefined;
}

interface ViewsProps {
  first: number;
  second: number;
}

function WindowSplitter(props: Props): JSX.Element {
  const [firstChild, setFirstChild] = useState<JSX.Element>();
  const [secondChild, setSecondChild] = useState<JSX.Element | JSX.Element[]>();

  const [viewSize, setViewSize] = useState<ViewsProps>({
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

  const handleChangeView = (ev) => {
    console.log(ev);

    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } =
      ev.target.parentElement.parentElement;
    console.log({ offsetLeft, offsetTop, offsetHeight, offsetWidth });

    const { pageX, pageY, movementX, movementY } = ev;
    const currentPercent = props.isHorizontally
      ? (pageY / window.innerHeight) * 100
      : (pageX / window.innerWidth) * 100;

    // let currentPercent = props.isHorizontally
    //   ? viewSize.first + movementY
    //   : viewSize.first + movementX;
    // currentPercent = currentPercent < 0 ? 0 : currentPercent;
    // currentPercent = currentPercent > 100 ? 100 : currentPercent;

    //console.log("currentPercent", currentPercent);
    setViewSize({
      first: currentPercent,
      second: 100 - currentPercent,
    });
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: props.isHorizontally ? "block" : "flex",
        }}
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

WindowSplitter.defaultProps = {
  isAutoWidth: false,
  isHorizontally: false,
};

export default WindowSplitter;
