import { IMimicElement } from "../../../models/Editor";

import { TransformerBase } from "../../../constants/mimicBaseElements/TransformerBase";

export interface BaseProps {
  [key: string]: {
    element: (props: any) => JSX.Element;
    box: (props: any) => JSX.Element;
    maxPoints: number;
  };
}

export function useDrawBox(): [Function] {
  function draw(active: boolean, component: IMimicElement): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;
    const Box = TransformerBase[type].box;
    return <>{active && <Box key={"box" + id} component={component}></Box>}</>;
  }
  return [draw];
}

export function useDrawElement(): [Function] {
  function draw(component: IMimicElement): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;
    const Element = TransformerBase[type].element;
    return <Element component={component} key={"element" + id} />;
  }
  return [draw];
}
