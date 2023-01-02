import { connect } from "react-redux";
import {
  moveOnBackLevel,
  moveOnBottomLevel,
  moveOnForwardLevel,
  moveOnTopLevel,
  setElementsBottomAlign,
  setElementsHorizonAlign,
  setElementsLeftAlign,
  setElementsRightAlign,
  setElementsTopAlign,
  setElementsVerticalAlign,
} from "../../../../store/actionCreators/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import BackLevel from "./icons/BackLevel";
import BottomAlign from "./icons/BottomAlign";
import BottomLevel from "./icons/BottomLevel";
import ForwardLevel from "./icons/ForwardLevel";
import HorizonAlign from "./icons/HorizonAlign";
import LeftAlign from "./icons/LeftAlign";
import RightAlign from "./icons/RightAlign";
import TopAlign from "./icons/TopAlign";
import TopLevel from "./icons/TopLevel";
import VerticalAlign from "./icons/VerticalAlign";

interface StateProps {
  future: [any];
  past: [any];
  selected: number[] | undefined;
}

interface DispatchProps {
  onTopLevel: Function;
  onForwardLevel: Function;
  onBottomLevel: Function;
  onBackLevel: Function;
  onSetLeftAlign: Function;
  onSetHorizonAlign: Function;
  onSetRightAlign: Function;
  onSetTopAlign: Function;
  onSetVerticalAlign: Function;
  onSetBottomAlign: Function;
}

interface OwnProps {
  children?: JSX.Element | JSX.Element[];
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    future: store.undoredobleEditorElements.future,
    past: store.undoredobleEditorElements.past,
    selected: selectSelectedElements(store),
  };
}

function mapDispatchToProps() {
  return {
    onTopLevel: moveOnTopLevel,
    onForwardLevel: moveOnForwardLevel,
    onBottomLevel: moveOnBottomLevel,
    onBackLevel: moveOnBackLevel,
    onSetLeftAlign: setElementsLeftAlign,
    onSetHorizonAlign: setElementsHorizonAlign,
    onSetRightAlign: setElementsRightAlign,
    onSetTopAlign: setElementsTopAlign,
    onSetVerticalAlign: setElementsVerticalAlign,
    onSetBottomAlign: setElementsBottomAlign,
  };
}

function ExpressPanel(props) {
  const handleOnTopLevel = () => {
    props.onTopLevel();
  };

  const handleOnForwardLevel = () => {
    props.onForwardLevel();
  };

  const handleOnBottomLevel = () => {
    props.onBottomLevel();
  };

  const handleOnBackLevel = () => {
    props.onBackLevel();
  };

  return (
    <div
      className="flex inline-flex"
      style={{
        width: "100%",
        borderBottom: "1px solid",
        overflowX: "scroll",
      }}
    >
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetLeftAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <LeftAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetHorizonAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <HorizonAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetRightAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <RightAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetTopAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <TopAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetVerticalAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <VerticalAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => props.onSetBottomAlign()}
        disabled={!(props.selected.length > 1)}
      >
        <BottomAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleOnForwardLevel}
        disabled={props.selected.length !== 1}
      >
        <ForwardLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleOnBackLevel}
        disabled={props.selected.length !== 1}
      >
        <BackLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleOnTopLevel}
        disabled={!(props.selected.length >= 1)}
      >
        <TopLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleOnBottomLevel}
        disabled={!(props.selected.length >= 1)}
      >
        <BottomLevel />
      </button>
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ExpressPanel);
