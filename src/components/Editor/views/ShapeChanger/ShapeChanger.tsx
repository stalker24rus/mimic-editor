import { useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { IMimicElement } from "../../../../models/Editor";
import { selectEditorElements } from "../../../../store/selectors/editorElements";
import { selectSelectedElements } from "../../../../store/selectors/editorState";
import { useDrawBox } from "../../../Hooks/useDraw";

export default function ShapeChanger(): JSX.Element {
  const [ElementShaper] = useDrawBox();

  const elements = useSelector(selectEditorElements);
  const selected = useSelector(selectSelectedElements);

  const Shapers = useMemo(
    () =>
      elements.map((element: IMimicElement, index: number) => {
        const active =
          selected.includes(element.attributes?.general?.id) || false;
        return <ElementShaper key={index} element={element} active={active} />;
      }),
    [elements, selected]
  );
  return <>{Shapers}</>;
}
