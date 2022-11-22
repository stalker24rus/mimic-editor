import { ELEMENT_TYPE_BUTTON } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";
import Button from "../../MimicBaseElements/Button";

export default function useDrawElement(): [Function] {
  function draw(component: MimicElementProps): JSX.Element {
    const { type } = component;

    const drawProps = {
      key: component.attributes.general.id,
      component,
    };

    switch (type) {
      case ELEMENT_TYPE_BUTTON: {
        return <Button {...drawProps} />;
      }

      default: {
        throw "Invalid mimic element.";
      }
    }
  }

  return [draw];
}
