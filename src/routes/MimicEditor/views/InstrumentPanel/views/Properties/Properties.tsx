import { useCallback, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { selectSelectedElements } from "../../../../../../store/selectors/editorState";
import { IChangesData, IMimicElement } from "../../../../../../models/Editor";
import { changeElementAttributes } from "../../../../../../store/actionCreators/editorElements";
import { selectMimic } from "../../../../../../store/selectors/editableMimic";

import Panel from "./views/Panel";
import { useTypedDispatch } from "../../../../../../store";

function Properties(): JSX.Element {
  const selected = useSelector(selectSelectedElements);
  const mimic = useSelector(selectMimic);
  const dispatch = useTypedDispatch();

  const [element, setElement] = useState<IMimicElement | undefined>(undefined);

  useEffect(() => {
    function returnElement(id: number, object: IMimicElement) {
      if (object.attributes.general.id === id) {
        return object;
      } else {
        for (let i = 0; i < object.children.length; i++) {
          const objectChild = object.children[i];
          const result = returnElement(id, objectChild);
          if (result) {
            return result;
          }
        }
      }
    }

    switch (selected.length) {
      case 0: {
        setElement(mimic);
        break;
      }

      case 1: {
        setElement(returnElement(selected[0], mimic));
        break;
      }

      default:
        setElement(undefined);
        break;
    }
  }, [selected, mimic.children, mimic]);

  const handleChange = useCallback(
    (changes: IChangesData) => {
      dispatch(changeElementAttributes(changes));
    },
    [dispatch]
  );

  const ElementProps = element?.type ? Panel : () => <></>;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {selected.length === 0 && (
        <ElementProps
          freezed={element?.freezed || false}
          attributes={element?.attributes}
          onChange={handleChange}
        />
      )}
      {selected.length > 1 && (
        <div>Редактирование свойств доступно только для одного объекта</div>
      )}
      {selected.length === 1 && (
        <ElementProps
          freezed={element?.freezed || false}
          attributes={element?.attributes}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default Properties;
