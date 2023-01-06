import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IChangesData, MimicElementProps } from "../../../../models/Editor";
import { changeAttributes } from "../../../../store/actionCreators/editorElements";
import {
  selectMimic,
  // selectMimicAttributes,
} from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import PropsPanel from "./components/PropsPanel";

interface IStateProps {
  selected: number[];
  mimic: MimicElementProps;
}

interface IDispatchProps {
  onChanges: Function;
}

interface IOwnProps {}

type IProps = IStateProps & IDispatchProps & IOwnProps;

function mapStateToProps(store) {
  return {
    selected: selectSelectedElements(store),
    mimic: selectMimic(store),
  };
}

function mapDispatchToProps() {
  return {
    onChanges: changeAttributes,
  };
}

function Properties(props: IProps): JSX.Element {
  const { selected, mimic } = props;

  const [element, setElement] = useState<MimicElementProps | undefined>(
    undefined
  );

  useEffect(() => {
    function returnElement(id: number, object: MimicElementProps) {
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

  const handleChange = (changes: IChangesData) => {
    props.onChanges(changes);
  };

  const ElementProps = element?.type ? PropsPanel : () => <></>;
  // console.log(mimicAttributes);

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
          attributes={element?.attributes}
          onChange={handleChange}
        />
      )}
      {selected.length > 1 && (
        <div>Редактирование свойств доступно только для одного объекта</div>
      )}
      {selected.length === 1 && (
        <ElementProps
          attributes={element?.attributes}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Properties);
