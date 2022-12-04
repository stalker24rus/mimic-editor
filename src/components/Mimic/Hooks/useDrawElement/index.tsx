import { FC } from "react";
import { ELEMENT_TYPE_BUTTON } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";
import Button from "../../MimicBaseElements/Button";
import RectangleBox from "../../Transformers/RectangleBox";

/*
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
*/

const ElementBase = {
  [ELEMENT_TYPE_BUTTON]: {
    element: Button,
    box: RectangleBox,
  },
};

export default function useDrawElement(): [Function] {
  function draw(component: MimicElementProps): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;

    const Element = ElementBase[type].element;
    const Box = ElementBase[type].box;
    /*
    if(Mode === ...) {
     <Box key={id} component={component}>
        <Element component={component} />
      </Box>
    } else {
        <Element key={id} component={component} />
    }
    
    */

    return (
      <Box key={id} component={component}>
        <Element component={component} />
      </Box>
    );
  }

  return [draw];
}
