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
  function draw({ element }): JSX.Element {
    const { type } = element;
    const Box = TransformerBase[type].box;
    return <Box component={element} />;
  }
  return [draw];
}

export function useDrawElement(): [Function] {
  function draw({ key, element }): JSX.Element {
    const { type } = element;
    const Element = TransformerBase[type].element;
    return <Element component={element} />;
  }
  return [draw];
}
