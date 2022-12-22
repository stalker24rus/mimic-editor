import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MimicElementProps } from "../../../../models/Editor";
import { selectEditorElements } from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import PropsPanel from "../../../Mimic/MimicBaseElements/Button/PropsPanel";

interface IStateProps {
  selected: number[];
  elements: MimicElementProps[];
}

interface IDispatchProps {}

interface IOwnProps {}

type IProps = IStateProps & IDispatchProps & IOwnProps;

function mapStateToProps(store) {
  return {
    selected: selectSelectedElements(store),
    elements: selectEditorElements(store),
  };
}

function mapDispatchToProps() {
  return {};
}

function Properties(props: IProps): JSX.Element {
  const { selected, elements } = props;

  const [element, setElement] = useState<MimicElementProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (selected.length === 1) {
      setElement(
        elements.find((element) =>
          selected.includes(element.attributes.general.id)
        )
      );
    } else {
      setElement(undefined);
    }
  }, [selected]);

  const ElementProps = element?.type ? PropsPanel : () => <></>;

  /**
   * для автогенерирования свойств нужно понимать
   *        тип свойства /
   *        допустимые значения если имеются /
   *        доступ на чтение-запись(изменение)
   *
   * расмотреть объединение в класс
   */
  return (
    <div
      style={
        {
          //width: "100%",
          //height: "100%",
          //background: "yellow",
        }
      }
    >
      {selected.length === 0 && <div>Выберете объект</div>}
      {selected.length > 1 && (
        <div>Редактирование свойств доступно только для одного объекта</div>
      )}
      {selected.length === 1 && (
        <ElementProps attributes={element?.attributes} />
      )}
    </div>
  );
}

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps()
)(Properties);
