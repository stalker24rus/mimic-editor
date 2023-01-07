import { useEffect } from "react";
import { connect } from "react-redux";
import { EDITOR_MODE_CREATE } from "../../constants/literals";
import { EditorModeProps, MimicElementProps } from "../../models/Editor";
import { setViewPosition } from "../../store/actionCreators/editorState";
import {
  selectEditorMode,
  selectSelectedElements,
  // selectIsMimicTouch,
} from "../../store/selectors/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../store/selectors/editorElements";

import CursorInfo from "./CursorInfo";
import useDrawElement, {
  useDrawElementWithoutBox,
} from "./Hooks/useDrawElement";
import KeyListener from "./KeyListener";

import ObjectSelector from "./ObjectSelector";
import PointListener from "./PointListener";

interface StateProps {
  elements: MimicElementProps[];
  mode: EditorModeProps;
  mimic: MimicElementProps;
  selected: number[];
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
    selected: selectSelectedElements(store),
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

  const [DrawFabric] = useDrawElement(); //useDrawElement();

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
              <>
                {elements?.map((element: MimicElementProps) => {
                  const active =
                    props.selected.includes(element.attributes?.general?.id) ||
                    false;
                  return DrawFabric(active, element);
                })}
              </>
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
