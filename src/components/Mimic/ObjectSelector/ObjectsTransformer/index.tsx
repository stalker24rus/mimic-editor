import { useMemo } from "react";
import { connect } from "react-redux";
import { IMimicElement } from "../../../../models/Editor";
import { selectEditorElements } from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import { useDrawBox } from "../../../Hooks/useDraw";

interface StateProps {
  selected: number[];
  elements: IMimicElement[];
}

interface DispatchProps {}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: selectEditorElements(store),
    selected: selectSelectedElements(store),
  };
}

function mapDispatchToProps() {
  return {};
}

function ObjectsTransformer(props: Props): JSX.Element {
  const { elements, selected } = props;
  const [DrawFabric] = useDrawBox();

  const memoBoxElements = useMemo(
    () =>
      elements.map((element: IMimicElement) => {
        const active =
          selected.includes(element.attributes?.general?.id) || false;
        return DrawFabric(active, element);
      }),
    [elements, selected]
  );
  return <>{memoBoxElements}</>;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ObjectsTransformer);
