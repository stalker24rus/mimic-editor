import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IMimicElement } from "../../../../../../models/Editor";
import { useTypedDispatch } from "../../../../../../store";
import { setSelectedElements } from "../../../../../../store/actionCreators/editorState";
import { selectMimic } from "../../../../../../store/selectors/editableMimic";
import { selectSelectedElements } from "../../../../../../store/selectors/editorState";

import "./ElementsTree.css";

function ElementsTree(): JSX.Element {
  const mimic = useSelector(selectMimic);
  const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const handleSelect = (ev: any, id: number) => {
    const { shiftKey } = ev;
    ev.preventDefault();

    if (shiftKey) {
      dispatch(setSelectedElements([...selected, id]));
    } else {
      dispatch(setSelectedElements([id]));
    }
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
  const handleSelectElement = (ev) => {
    onSelectElement(ev, element.attributes.general.id);
  };

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
        onClick={handleSelectElement}
      >
        {element.type} - {element.attributes.general.name}
      </div>
      {element.children.length > 0 && (
        <>
          {element.children.map((child: IMimicElement) => (
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
        </>
      )}
    </div>
  );
}

export default ElementsTree;
