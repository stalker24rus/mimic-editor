import { useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { IMimicElement } from "../../../../models/Editor";
import { useDrawBox } from "../../../../hooks/useDraw";

export default function ShapeTransformer({ elements, selected }): JSX.Element {
  const [ElementShaper] = useDrawBox();

  const Shapers = useMemo(
    () =>
      elements.map((element: IMimicElement) => {
        const isActive =
          selected.includes(element.attributes?.general?.id) || false;
        return isActive ? ElementShaper({ element }) : null;
      }),
    [elements, selected]
  );
  return <>{Shapers}</>;
}
