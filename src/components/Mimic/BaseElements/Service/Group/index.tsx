import { useMemo } from "react";
import { ELEMENT_TYPE_GROUP, MIMIC } from "../../../../../constants/literals";
import { IMimicElement } from "../../../../../models/Editor";
import { useDrawElement } from "../../../../../hooks/useDraw";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
}

export default function Group(props: Props): JSX.Element {
  const { component } = props;
  const { attributes } = component;
  const { position, general } = attributes;
  const { points, width, height } = position;
  const { id } = general;

  const [Element] = useDrawElement();

  const memoChildren = useMemo(
    () =>
      component.children?.map((element: IMimicElement, index: number) => {
        return <Element key={index} element={element} />;
      }),
    [component.children]
  );

  return (
    <div
      style={{
        top: points[0].y | 0,
        left: points[0].x | 0,
        width,
        height,
        position: "absolute",
        pointerEvents: "visible", //disablePointerEvents ? "none" : "visible",
      }}
    >
      <div
        style={{
          width,
          height,
          position: "relative",
        }}
      >
        {memoChildren}
      </div>
      <div
        id={MIMIC + "." + ELEMENT_TYPE_GROUP + "." + id}
        style={{
          width,
          height,
          top: 0,
          left: 0,
          position: "absolute",
        }}
      ></div>
    </div>
  );
}
