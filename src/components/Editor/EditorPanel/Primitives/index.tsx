import { connect } from "react-redux";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../../../constants/literals";
import { editorAddElement } from "../../../../store/actionCreators/editorState";
import { selectSelectedElements } from "../../../../store/selectors/editorState";

interface StateProps {
  future: [any];
  past: [any];
  selected: number[] | undefined;
}

interface DispatchProps {
  onAddElement: Function;
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
    onAddElement: editorAddElement,
  };
}

const Primitives = (props: Props): JSX.Element => {
  const { onAddElement } = props;

  return (
    <>
      <div>
        <button
          className="w-100 h-200 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => onAddElement(ELEMENT_TYPE_BUTTON)}
        >
          Кнопка
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => onAddElement(ELEMENT_TYPE_LINE)}
        >
          Линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => onAddElement(ELEMENT_TYPE_POLYLINE)}
        >
          Поли линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => onAddElement(ELEMENT_TYPE_POLYGON)}
        >
          Полигон
        </button>
      </div>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Primitives);
