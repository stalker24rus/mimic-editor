import { useEffect } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../models/Editor";
import {
  deleteSelectedElements,
  redo,
  undo,
} from "../../store/actionCreators/editorElements";
import {
  handleEscapeButton,
  setViewPosition,
} from "../../store/actionCreators/editorState";
import EditorContextMenu from "../Editor/EditorContextMenu";
import useDrawElement from "./Hooks/useDrawElement";

import MimicCanvas from "./MimicCanvas";

interface StateProps {
  elements: MimicElementProps[];
}

interface DispatchProps {
  undo: Function;
  redo: Function;
  onDelete: Function;
  onEscape: Function;
  onSetViewPosition: Function;
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
    onDelete: deleteSelectedElements,
    onEscape: handleEscapeButton,
    onSetViewPosition: setViewPosition,
  };
}

const Mimic = (props: Props): JSX.Element => {
  const elements = props.elements;

  const [DrawFabric] = useDrawElement();

  useEffect(() => {
    // FIXME -> Any
    const keyListener = (ev: any) => {
      console.log(ev);

      //ev.target.preventDefault();

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "Z" || ev.key === "z" || ev.code === "KeyZ")
      ) {
        if (ev.shiftKey) {
          props.redo();
        } else {
          props.undo();
        }
      }

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "A" || ev.key === "a" || ev.code === "KeyA")
      ) {
        console.log(ev, ev.key);
      }

      if (ev.key === "Delete" || ev.code === "Delete") {
        props.onDelete();
      }

      if (ev.key === "Escape" || ev.code === "Escape") {
        props.onEscape();
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [elements]);

  const handleScroll = () => {
    const htmlRect = document
      .getElementById("mimic.frame")
      ?.getBoundingClientRect();

    if (htmlRect) {
      const { x, y } = htmlRect;

      props.onSetViewPosition({ x, y });
    }
  };
  // console.log(JSON.stringify(elements));
  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      onScroll={handleScroll}
    >
      <MimicCanvas>
        {elements.length > 0 && (
          <span>
            {elements?.map((element: MimicElementProps) => {
              return DrawFabric(element);
            })}
          </span>
        )}
        {/* <EditorContextMenu /> */}
      </MimicCanvas>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Mimic);
