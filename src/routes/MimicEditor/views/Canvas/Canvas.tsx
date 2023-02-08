import { IMimicElement } from "../../../../models/Editor";

interface Props {
  mainElement: IMimicElement;
  cursor: string;
  onScroll: Function;
  children?: JSX.Element[] | JSX.Element;
}

export default function Canvas({
  mainElement,
  cursor,
  onScroll,
  children,
}: Props): JSX.Element {
  const { type, attributes } = mainElement;

  const handleScroll = (ev) => onScroll(ev);

  return (
    <div
      className="noselect"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        touchAction: "none",
      }}
      onScroll={handleScroll}
    >
      <div
        id={type}
        style={{
          position: "relative",
          width: attributes?.position?.width | 0,
          height: attributes?.position?.height | 0,
          background: attributes?.appearance?.fill,
          cursor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
