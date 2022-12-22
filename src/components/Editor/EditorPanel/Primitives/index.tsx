import { connect } from "react-redux";
import {
  moveOnBackLevel,
  moveOnBottomLevel,
  moveOnForwardLevel,
  moveOnTopLevel,
  redo,
  undo,
} from "../../../../store/actionCreators/editorElements";
import {
  editorAddButton,
  editorAddLine,
  editorAddPolygon,
  editorAddPolyline,
} from "../../../../store/actionCreators/editorState";
import { selectSelectedElements } from "../../../../store/selectors/editorState";

interface StateProps {
  future: [any];
  past: [any];
  selected: number[] | undefined;
}

interface DispatchProps {
  onAddButton: Function;
  onAddLine: Function;
  onAddPolyline: Function;
  onAddPolygon: Function;
  onUndo: Function;
  onRedo: Function;
  onTopLevel: Function;
  onForwardLevel: Function;
  onBottomLevel: Function;
  onBackLevel: Function;
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
    onAddButton: editorAddButton,
    onAddLine: editorAddLine,
    onAddPolyline: editorAddPolyline,
    onAddPolygon: editorAddPolygon,
    onUndo: undo,
    onRedo: redo,
    onTopLevel: moveOnTopLevel,
    onForwardLevel: moveOnForwardLevel,
    onBottomLevel: moveOnBottomLevel,
    onBackLevel: moveOnBackLevel,
  };
}

const Primitives = (props: Props): JSX.Element => {
  const handleAddButton = () => {
    props.onAddButton();
  };

  const handleAddLine = () => {
    props.onAddLine();
  };

  const handleAddPolyline = () => {
    props.onAddPolyline();
  };

  const handleAddPolygone = () => {
    props.onAddPolygon();
  };

  const handleUndo = () => {
    props.onUndo();
  };

  const handleRedo = () => {
    props.onRedo();
  };

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
    <>
      <div>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddButton}
        >
          Кнопка
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddLine}
        >
          Линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddPolyline}
        >
          Поли линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddPolygone}
        >
          Полигон
        </button>

        {/* <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleUndo}
          disabled={!props.past.length}
        >
          <div className="w-4 ">
            <div>&#8630;</div>
            <div className="text-xs">{props.past.length}</div>
          </div>
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleRedo}
          disabled={!props.future.length}
        >
          <div className="w-4 ">
            <div>&#8631;</div>
            <div className="text-xs">{props.future.length}</div>
          </div>
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleOnTopLevel}
        >
          on top
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleOnForwardLevel}
          disabled={props.selected.length !== 1}
        >
          on forward
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleOnBottomLevel}
        >
          on bottom
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm disabled:opacity-60"
          onClick={handleOnBackLevel}
          disabled={props.selected.length !== 1}
        >
          on back
        </button> */}
      </div>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Primitives);