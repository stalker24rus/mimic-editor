import { useEffect } from "react";
import { connect } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../constants/literals";
import { EditorModeProps, MimicElementProps } from "../../models/Editor";
import { setViewPosition } from "../../store/actionCreators/editorState";
import {
  selectEditorMode,
  // selectIsMimicTouch,
} from "../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../store/selectors/editorElements";

import CursorInfo from "./CursorInfo";
import useDrawElement from "./Hooks/useDrawElement";
import KeyListener from "./KeyListener";

import ObjectSelector from "./ObjectSelector";
import PointListener from "./PointListener";

interface StateProps {
  elements: MimicElementProps[];
  mode: EditorModeProps;
  mimic: MimicElementProps;
  // isMimicTouch: boolean;
}

interface DispatchProps {
  onSetViewPosition: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: selectEditorElements(store),
    mode: selectEditorMode(store),
    mimic: selectMimic(store),
    // isMimicTouch: selectIsMimicTouch(store),
  };
}

function mapDispatchToProps() {
  return {
    onSetViewPosition: setViewPosition,
  };
}

const Mimic = (props: Props): JSX.Element => {
  const { mimic, elements, mode } = props;

  const [DrawFabric] = useDrawElement();

  function handleResize() {
    const htmlRect = document
      .getElementById(mimic.type)
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
      className="noselect"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        touchAction: "none", //isMimicTouch ? "auto" : "none",
      }}
      onScroll={handleScroll}
      // onPointerDown={() => console.log("MAIN POINTER DOWN")}
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

/**
 import React from "react";

const RecursiveComponent = ({children}) => {
  return (
    <div>
      {children.length > 0 && <RecursiveComponent children={children} />}
    </div>
  );
};

export default RecursiveComponent;
 */
