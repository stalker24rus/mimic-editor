type Orientation = "vertical" | "horizontal";

interface SimpleSplitterProps {
  orientation?: Orientation;
  defaultRatio?: number;
  children: JSX.Element | JSX.Element[];
}

interface SplitterProps {
  position: number;
  orientation: Orientation;
  onDrag: Function;
}

interface ContainerProps {
  slice: number;
  orientation: Orientation;
  children: JSX.Element | JSX.Element[];
}
