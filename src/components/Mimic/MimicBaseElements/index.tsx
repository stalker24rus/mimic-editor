import {
  BaseCanvasHandlers,
  BoxProps,
  Component,
  ComponentProps,
} from "../../../models/mimic";
import {
  ButtonComponent,
  LineComponent,
  PolygonElement,
  PolyLineElement,
} from "../../BaseMimicComponents";

import Button from "../../BaseMimicComponents/Button";
import Line from "../../BaseMimicComponents/Line";
import RectangleBox from "../../MimicWrapper/Transformers/RectangleBox";
import LineBox from "../../MimicWrapper/Transformers/LineBox";
import MultiObjectBox from "../../MimicWrapper/Transformers/MultiObjectBox";
import PolyLine from "../../BaseMimicComponents/Polyline";
import Polygon from "../../BaseMimicComponents/Polygon";

export default function useDrawElement(): [Function] {
  function draw(
    component: Component,
    handlers: BaseCanvasHandlers,
    isSelected: boolean
  ): JSX.Element {
    const { type } = component;

    const drawProps = {
      key: component.attributes.general.id,
      component,
      ...handlers,
      isSelected,
    };

    switch (type) {
      case ButtonComponent: {
        return (
          <RectangleBox {...drawProps}>
            {(injectedProps: ComponentProps) => <Button {...injectedProps} />}
          </RectangleBox>
        );
      }
      case LineComponent: {
        return (
          <LineBox {...drawProps}>
            {(injectedProps: ComponentProps) => <Line {...injectedProps} />}
          </LineBox>
        );
      }

      case PolyLineElement: {
        return (
          <MultiObjectBox {...drawProps}>
            {(injectedProps: ComponentProps) => <PolyLine {...injectedProps} />}
          </MultiObjectBox>
        );
      }

      case PolygonElement: {
        return (
          <MultiObjectBox {...drawProps}>
            {(injectedProps: ComponentProps) => <Polygon {...injectedProps} />}
          </MultiObjectBox>
        );
      }
    }
  }

  return [draw];
}
