import { ELEMENT_TYPE_GROUP, MIMIC } from "../../../../../constants/literals";
import { IMimicElement } from "../../../../../models/Editor";
import useDrawElement, {
  useDrawElementWithoutBox,
} from "../../../../Hooks/useDrawElement";

interface Props {
  disablePointerEvents?: boolean;
  component: IMimicElement;
}

export default function Group(props: Props): JSX.Element {
  const { component, disablePointerEvents } = props;
  const { attributes, type } = component;
  const { position, general } = attributes;
  const { points, width, height } = position;
  const { id } = general;

  const [DrawFabric] = useDrawElementWithoutBox(); //useDrawElement();

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
        {component.children?.map((element: IMimicElement) => {
          return DrawFabric(element);
        })}
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
