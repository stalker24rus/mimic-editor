import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPoint } from "../../../models/Editor";
import { selectViewPosition } from "../../../store/selectors/editorState";

interface StateProps {
  viewPosition: IPoint;
}

interface DispatchProps {}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    viewPosition: selectViewPosition(store),
  };
}

function mapDispatchToProps() {
  return {};
}

function CursorInfo(props: Props): JSX.Element {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const indent: IPoint = {
    x: 10,
    y: 10,
  };

  useEffect(() => {
    // FIXME
    const update = (ev: any) => {
      const { clientX, clientY } = ev;

      const { x, y } = {
        x: clientX - props.viewPosition.x,
        y: clientY - props.viewPosition.y,
      };
      setX(x);
      setY(y);
    };

    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [setX, setY]);

  return (
    <div
      className="w-100 h-100 bg-stone-50 rounded-md"
      style={{ top: y + indent.y, left: x + indent.x, position: "absolute" }}
    >
      {x}.{y}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CursorInfo);
