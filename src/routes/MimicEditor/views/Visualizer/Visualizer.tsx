import { useMemo } from "react";
import { IMimicElement } from "../../../../models/Editor";
import { useDrawElement } from "../../../../hooks/useDraw";

export default function Visualizer({ elements }): JSX.Element {
  const [Element] = useDrawElement();

  const CanvasElements = useMemo(
    () =>
      elements.map((element: IMimicElement) => {
        const { type } = element;
        const { id } = element.attributes.general;
        return <Element key={type + id} element={element} />;
      }),
    [elements, Element]
  );

  return <div>{CanvasElements}</div>;
}
