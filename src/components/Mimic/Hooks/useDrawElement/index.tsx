import { FC } from "react";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../../../constants/literals";
import { ElementType, MimicElementProps } from "../../../../models/Editor";
import Button from "../../MimicBaseElements/Button";
import Line from "../../MimicBaseElements/Line";
import Polygon from "../../MimicBaseElements/Polygon";
import PolyLine from "../../MimicBaseElements/PolyLine";
import MultiObjectBox from "../../Transformers/MultiObjectBox";
import RectangleBox from "../../Transformers/RectangleBox";

interface BaseProps {
  [key: string]: {
    element: (props: any) => JSX.Element;
    box: (props: any) => JSX.Element;
  };
}

interface Props {
  component: MimicElementProps;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

const ElementBase: BaseProps = {
  [ELEMENT_TYPE_BUTTON]: {
    element: Button,
    box: RectangleBox,
  },
  [ELEMENT_TYPE_LINE]: {
    element: Line,
    box: MultiObjectBox,
  },
  [ELEMENT_TYPE_POLYLINE]: {
    element: PolyLine,
    box: MultiObjectBox,
  },
  [ELEMENT_TYPE_POLYGON]: {
    element: Polygon,
    box: MultiObjectBox,
  },
};

export default function useDrawElement(): [Function] {
  function draw(component: MimicElementProps): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;

    const Element = ElementBase[type].element;
    const Box = ElementBase[type].box;

    return (
      <Box key={id} component={component}>
        {(props: Props) => <Element {...props} />}
      </Box>
    );
  }

  return [draw];
}

/*
    if(Mode === ...) {
     <Box key={id} component={component}>
        <Element component={component} />
      </Box>
    } else {
        <Element key={id} component={component} />
    }
    
    */
