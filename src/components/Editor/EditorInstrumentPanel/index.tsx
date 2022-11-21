import { connect } from "react-redux";
import {
  editorAddButton,
  editorAddLine,
  editorAddPolygon,
  editorAddPolyline,
} from "../../../store/actionCreators/editorState";

interface StateProps {}

interface DispatchProps {
  onAddButton: Function;
  onAddLine: Function;
  onAddPolyline: Function;
  onAddPolygon: Function;
}

interface OwnProps {
  children?: JSX.Element | JSX.Element[];
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {
    onAddButton: editorAddButton,
    onAddLine: editorAddLine,
    onAddPolyline: editorAddPolyline,
    onAddPolygon: editorAddPolygon,
  };
}

const InstrumentPanel = (props: Props): JSX.Element => {
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

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-50">
      <div className="inline-flex" id="Component" style={{ top: 0, left: 0 }}>
        <div className="text-1xl text-center font-small text-gray-900 dark:text-white bg-gray-800 align-middle m-2">
          REACT_SCADA
        </div>
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
      </div>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(InstrumentPanel);
