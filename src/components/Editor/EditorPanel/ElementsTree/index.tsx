import { connect } from "react-redux";
import { MimicElementProps } from "../../../../models/Editor";
import { selectElement } from "../../../../store/actionCreators/editorState";
import { selectEditorElements } from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";

import "./index.css";

interface StateProps {
  selected: number[];
  elements: MimicElementProps[];
}

interface DispatchProps {
  onSelectElement: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    elements: selectEditorElements(store),
    selected: selectSelectedElements(store),
  };
}

function mapDispatchToProps() {
  return {
    onSelectElement: selectElement,
  };
}

function ElementsTree({
  elements,
  selected,
  onSelectElement,
}: Props): JSX.Element {
  const handleSelect = (ev: any, id: number) => {
    const { shiftKey } = ev;

    if (shiftKey) {
      onSelectElement([...selected, id]);
    } else {
      onSelectElement([id]);
    }
    ev.preventDefault();
  };

  return (
    <div className="noselect">
      {elements.map((elemen_, index) => {
        const element: MimicElementProps = elemen_;
        return (
          <div
            key={"tree" + index}
            className={`text-black ${
              selected.includes(element.attributes.general.id)
                ? "bg-gray-200"
                : ""
            } hover:bg-gray-200 m-1 rounded`}
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(ev) => handleSelect(ev, element.attributes.general.id)}
          >
            {element.type} - {element.attributes.general.name}
          </div>
        );
      })}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ElementsTree);
