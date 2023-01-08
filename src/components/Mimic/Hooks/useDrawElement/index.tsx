import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../../../../constants/literals";
import { IMimicElement } from "../../../../models/Editor";
import Button from "../../MimicBaseElements/Button";
import Line from "../../MimicBaseElements/Line";
import Polygon from "../../MimicBaseElements/Polygon";
import Polyline from "../../MimicBaseElements/Polyline";
import Group from "../../ServiceElements/Group";

import MoverBox from "../../Transformers/MoverBox";
import MultiObjectBox from "../../Transformers/MultiObjectBox";
import RectangleBox from "../../Transformers/RectangleBox";

interface BaseProps {
  [key: string]: {
    element: (props: any) => JSX.Element;
    box: (props: any) => JSX.Element;
    maxPoints: number;
  };
}

interface Props {
  component: IMimicElement;
  onPointerMove: Function;
  onPointerUp: Function;
  onPointerDown: Function;
}

export const ElementBase: BaseProps = {
  [ELEMENT_TYPE_BUTTON]: {
    element: Button,
    box: RectangleBox,
    maxPoints: 1,
  },
  [ELEMENT_TYPE_LINE]: {
    element: Line,
    box: MultiObjectBox,
    maxPoints: 2,
  },
  [ELEMENT_TYPE_POLYLINE]: {
    element: Polyline,
    box: MultiObjectBox,
    maxPoints: 999,
  },
  [ELEMENT_TYPE_POLYGON]: {
    element: Polygon,
    box: MultiObjectBox,
    maxPoints: 999,
  },
  [ELEMENT_TYPE_GROUP]: {
    element: Group,
    box: MoverBox,
    maxPoints: 1,
  },
};

// export default function useDrawElement(): [Function] {
//   function draw(component: MimicElementProps): JSX.Element {
//     const { type } = component;
//     const { id } = component.attributes.general;

//     const Element = ElementBase[type].element;
//     const Box = ElementBase[type].box;

//     return (
//       <Box key={id} component={component}>
//         {(props: Props) => <Element {...props} />}
//       </Box>
//     );
//   }

//   return [draw];
// }

export default function useDrawElement(): [Function] {
  function draw(active: boolean, component: IMimicElement): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;

    const Element = ElementBase[type].element;
    const Box = ElementBase[type].box;

    return (
      <>
        <Element component={component} key={"element" + id} />
        {active && <Box key={"box" + id} component={component}></Box>}
      </>
    );
  }

  return [draw];
}

export function useDrawElementWithoutBox(): [Function] {
  function draw(component: IMimicElement): JSX.Element {
    const { type } = component;
    const { id } = component.attributes.general;

    const Element = ElementBase[type].element;
    return <Element component={component} key={id} />;
  }
  return [draw];
}
