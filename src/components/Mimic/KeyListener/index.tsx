import { useEffect } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../../models/Editor";
import {
  deleteSelectedElements,
  moveElementGroup,
  pasteElements,
  redo,
  undo,
} from "../../../store/actionCreators/editorElements";
import {
  copyElements,
  escapeElements,
} from "../../../store/actionCreators/editorState";

interface StateProps {
  elements: MimicElementProps[];
}

interface DispatchProps {
  undo: Function;
  redo: Function;
  onDelete: Function;
  onEscape: Function;
  onCopy: Function;
  onPaste: Function;
  onMoveElementGroup: Function;
}

interface OwnProps {
  children: JSX.Element | JSX.Element[];
}

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
    onEscape: escapeElements,
    onCopy: copyElements,
    onPaste: pasteElements,
    onMoveElementGroup: moveElementGroup,
  };
}

function KeyListener(props: Props): JSX.Element {
  useEffect(() => {
    // FIXME -> Any
    const keyListener = (ev: any) => {
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

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "C" || ev.key === "c" || ev.code === "KeyC")
      ) {
        props.onCopy();
      }

      if (
        (ev.metaKey || ev.ctrlKey) &&
        (ev.key === "V" || ev.key === "v" || ev.code === "KeyV")
      ) {
        props.onPaste();
      }

      if (ev.key === "Delete" || ev.code === "Delete") {
        props.onDelete();
      }

      if (ev.key === "Escape" || ev.code === "Escape") {
        props.onEscape();
      }

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        props.onMoveElementGroup({ x: -1, y: 0 });
      }

      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        props.onMoveElementGroup({ x: 1, y: 0 });
      }

      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        props.onMoveElementGroup({ x: 0, y: -1 });
      }

      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        props.onMoveElementGroup({ x: 0, y: 1 });
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  });

  return <>{props.children}</>;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(KeyListener);
