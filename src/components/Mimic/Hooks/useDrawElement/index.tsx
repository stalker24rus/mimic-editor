import { FC } from "react";
import { ELEMENT_TYPE_BUTTON } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";
import Button from "../../MimicBaseElements/Button";

interface ElementBaseProps {
  [key: string]: FC;
}

const ElementBase: ElementBaseProps = {
  [ELEMENT_TYPE_BUTTON]: Button,
};

export default function useDrawElement(): [Function] {
  function draw(component: MimicElementProps): JSX.Element {
    const { type } = component;

    const drawProps = {
      key: component.attributes.general.id,
      component,
    };

    const Element = ElementBase[type];
    return <Element {...drawProps} />;
  }

  return [draw];
}
