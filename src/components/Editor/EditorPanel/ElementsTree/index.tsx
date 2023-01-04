import { connect } from "react-redux";
import { MimicElementProps } from "../../../../models/Editor";
import { selectElement } from "../../../../store/actionCreators/editorState";
import {
  selectEditorElements,
  selectMimic,
} from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";

import "./index.css";

interface StateProps {
  selected: number[];
  // elements: MimicElementProps[];
  mimic: MimicElementProps;
}

interface DispatchProps {
  onSelectElement: Function;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(store) {
  return {
    // elements: selectEditorElements(store),
    selected: selectSelectedElements(store),
    mimic: selectMimic(store),
  };
}

function mapDispatchToProps() {
  return {
    onSelectElement: selectElement,
  };
}

function ElementsTree({
  mimic,
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
      <RecursiveTree
        element={mimic}
        selected={selected}
        onSelectElement={handleSelect}
      />
    </div>
  );
}

function RecursiveTree({ element, selected, onSelectElement }): JSX.Element {
  return (
    <div>
      <div
        className={`text-black ${
          selected.includes(element.attributes.general.id) ? "bg-gray-200" : ""
        } hover:bg-gray-200 m-1 rounded`}
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={(ev) => onSelectElement(ev, element.attributes.general.id)}
      >
        {element.type} - {element.attributes.general.name}
      </div>
      {element.children.length > 0 &&
        element.children.map((child: MimicElementProps) => (
          <div className="flex inline">
            <div className="w-8 text-right">{""}</div>
            <RecursiveTree
              key={child.attributes.general.id}
              element={child}
              selected={selected}
              onSelectElement={onSelectElement}
            />
          </div>
        ))}
    </div>
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(ElementsTree);
