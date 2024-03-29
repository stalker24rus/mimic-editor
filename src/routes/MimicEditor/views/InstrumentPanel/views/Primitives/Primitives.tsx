import { connect } from "react-redux";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../../../../../constants/literals";
import { editorAddElement } from "../../../../../../store/actionCreators/editorState";
import { selectSelectedElements } from "../../../../../../store/selectors/editorState";

import MosaicView, {
  MosaicProps,
  ViewProps,
} from "../../../../../../ui/MosaicView";
import { useCallback, useMemo } from "react";
import DemoButton from "./views/DemoButton";
import DemoLine from "./views/DemoLine";
import DemoPolyline from "./views/DemoPoliline";
import DemoPolygon from "./views/DemoPoligon";

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
    future: store.editableMimic.future,
    past: store.editableMimic.past,
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
      demo: <DemoButton />,
      onClick: useCallback(
        () => onAddElement(ELEMENT_TYPE_BUTTON),
        [onAddElement]
      ),
    },
    {
      name: "Линия",
      img: "",
      demo: <DemoLine />,
      onClick: useCallback(
        () => onAddElement(ELEMENT_TYPE_LINE),
        [onAddElement]
      ),
    },
    {
      name: "Поли-линия",
      img: "",
      demo: <DemoPolyline />,
      onClick: useCallback(
        () => onAddElement(ELEMENT_TYPE_POLYLINE),
        [onAddElement]
      ),
    },
    {
      name: "Полигон",
      img: "",
      demo: <DemoPolygon />,
      onClick: useCallback(
        () => onAddElement(ELEMENT_TYPE_POLYGON),
        [onAddElement]
      ),
    },
  ];

  const memoElements = useMemo(() => elements, elements);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <MosaicView elements={memoElements} />
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Primitives);
