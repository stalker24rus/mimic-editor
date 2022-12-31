import { useEffect } from "react";
import { connect } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../constants/literals";
import { EditorModeProps, MimicElementProps } from "../../models/Editor";
import { setViewPosition } from "../../store/actionCreators/editorState";
import CursorInfo from "./CursorInfo";
import useDrawElement from "./Hooks/useDrawElement";
import KeyListener from "./KeyListener";

import ObjectSelector from "./ObjectSelector";
import PointListener from "./PointListener";

interface StateProps {
  elements: MimicElementProps[];
  mode: EditorModeProps;
}

interface DispatchProps {
  onSetViewPosition: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: store.undoredobleEditorElements.present,
    mode: store.editorState.mode,
  };
}

function mapDispatchToProps() {
  return {
    onSetViewPosition: setViewPosition,
  };
}

const Mimic = (props: Props): JSX.Element => {
  const { elements, mode } = props;

  const [DrawFabric] = useDrawElement();

  function handleResize() {
    const htmlRect = document
      .getElementById("mimic.frame")
      ?.getBoundingClientRect();

    if (htmlRect) {
      const { x, y } = htmlRect;

      props.onSetViewPosition({ x, y });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleScroll = (ev) => {
    ev.preventDefault();
    handleResize();
  };

  // console.log(JSON.stringify(elements));
  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      onScroll={handleScroll}
    >
      <KeyListener>
        <PointListener>
          <ObjectSelector>
            {elements.length > 0 && (
              <span>
                {elements?.map((element: MimicElementProps) => {
                  return DrawFabric(element);
                })}
              </span>
            )}
            {/* <EditorContextMenu /> */}

            {mode === EDITOR_MODE_CREATE && <CursorInfo />}
          </ObjectSelector>
        </PointListener>
      </KeyListener>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Mimic);
