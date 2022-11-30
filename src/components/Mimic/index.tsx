import { useEffect } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../models/Editor";
import { redo, undo } from "../../store/actionCreators/editorElements";
import useDrawElement from "./Hooks/useDrawElement";

import MimicCanvas from "./MimicCanvas";

interface StateProps {
  elements: MimicElementProps[];
}

interface DispatchProps {
  undo: Function;
  redo: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: store.undoredobleEditorElements.present,
  };
}

function mapDispatchToProps() {
  return {
    undo: undo,
    redo: redo,
  };
}

const Mimic = (props: Props): JSX.Element => {
  const elements = props.elements;

  const [DrawFabric] = useDrawElement();

  useEffect(() => {
    // FIXME -> Any
    const keyListener = (ev: any) => {
      if ((ev.metaKey || ev.ctrlKey) && (ev.key === "Z" || ev.key === "z")) {
        if (ev.shiftKey) {
          props.redo();
        } else {
          props.undo();
        }
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [elements]);

  return (
    <MimicCanvas>
      {elements.length > 0 && (
        <span>
          {elements?.map((element: MimicElementProps) => {
            return DrawFabric(element);
          })}
        </span>
      )}
    </MimicCanvas>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Mimic);
