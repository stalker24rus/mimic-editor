import { connect } from "react-redux";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../../../constants/literals";
import { editorAddElement } from "../../../../store/actionCreators/editorState";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import MosaicView, { MosaicProps, ViewProps } from "../../MosaicView";

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

  const elements: ViewProps[] = [
    {
      name: "Кнопка",
      img: "",
      onClick: () => {
        onAddElement(ELEMENT_TYPE_BUTTON);
      },
    },
    {
      name: "Линия",
      img: "",
      onClick: () => {
        onAddElement(ELEMENT_TYPE_LINE);
      },
    },
    {
      name: "Поли-линия",
      img: "",
      onClick: () => {
        onAddElement(ELEMENT_TYPE_POLYLINE);
      },
    },
    {
      name: "Полигон",
      img: "",
      onClick: () => {
        onAddElement(ELEMENT_TYPE_POLYGON);
      },
    },
  ];

  return (
    <>
      <div
        style={{
          // top: "0",
          //position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <MosaicView elements={elements} />
      </div>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Primitives);
