export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type CLASS_NAMED = `${string}`;

//FIXME from PointFromat to PointFormat
export interface PointFromat {
  x: number;
  y: number;
}

export type LineAttributes = {
  points: PointFromat[];
  stroke: string;
  strokeWidth: number;
};

export type Properties = {
  [key: string]: any;
  tag?: string;
};

type ElementType = "FRAME" | "BUTTON" | "LINE" | "POLYGON" | "POLYLINE";

export type MimicElementProps = {
  type: ElementType;
  layer: number;
  attributes: Attributes;
  service: Service | undefined;
  children?: Array<MimicElementProps>;
};

export interface InitAttributes {
  position: PositionType;
  properties: { [any: string]: any }; // It defines inside a component.
  appearance?: AppearenceType;
  animation?: Array<AnimationType>;
  action?: Action;
  font?: FontType;
}

export interface Attributes extends InitAttributes {
  general: GeneralElementType;
}

export type Service = {
  pointsAmount: number;
};

export type GeneralElementType = {
  id: number;
  name: string;
  tagName: string | undefined;
};

export type AppearenceType = {
  fill?: RGB | RGBA | HEX | CLASS_NAMED;
  opacity?: number;
  stroke?: RGB | RGBA | HEX | CLASS_NAMED;
  strokeWidth?: number;
  visability?: boolean;
};

export type FontType = {
  fontFamily:
    | "Arial"
    | "Verdana"
    | "Tahoma"
    | "Helvetica"
    | "Georgia"
    | "Times New Roman";
  fontSize: number;
  fontStyle: "normal" | "italic" | "oblique" | "inherit";
  fontWeight: "bold" | "bolder" | "lighter" | "normal";
  horizonAlign: "left" | "right" | "middle";
};

export type PositionType = {
  points?: PointFromat[];
  angle?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
};

export type HandlerChangeBit = {
  type: "bit";
  operation: "toggle" | "set" | "reset";
  bitNumber: number;
};

export type HandlerChangeValue = {
  type: "value";
  value: number;
};

export type HandlerChangeMimic = {
  type: "mimic";
  mimicName: string;
};

export type HandlerExecuteScript = {
  type: "script";
  language: "js";
  script: string;
};

export type Action = {
  operation: "setBit" | "setValue" | "changeMimic" | "executeScript" | "none";
  handler:
    | HandlerChangeBit
    | HandlerChangeValue
    | HandlerChangeMimic
    | HandlerExecuteScript
    | undefined;
};

export type AnimationType = {
  value: number | string;
  appearence: AppearenceType;
};

// export const PlaceRoot: string = "root";

// export const PlaceInner: string = "inner";

export type PlaceOperation = "root" | "inner";

export type StackHistoryRecord = {
  action: string;
  prevState?: MimicElementProps | undefined;
  nextState?: MimicElementProps;
  place: PlaceOperation;
};

export type HystoryStorage = {
  step: number;
  maxSize: number;
  stack: StackHistoryRecord[];
};

export type BaseHandlers = {
  onPointerDown?: Function;
  onPointerUp?: Function;
  onPointerMove?: Function;
  onDragMove?: Function;
};

export interface ComponentProps extends BaseHandlers {
  component: MimicElementProps;
  onClick?: Function;
  newElement?: boolean;
}

export interface BoxProps extends BaseHandlers {
  component: MimicElementProps;
  isSelected: boolean;
  children: (props: ComponentProps) => JSX.Element;
}

/**
 * CANVAS TYPES
 */

export type BaseCanvasHandlers = {
  //onCreateElement: Function;
  onSetAttributes: Function;
  onPointerDown: Function;
  onPointerMove: Function;
  onPointerUp: Function;
};

export type CanvasSettings = {
  width: number;
  height: number;
  background: string;
};

// export type EDIT = EDITOR_MODE_EDIT; //"EDIT";
// export type CREATE = "CREATE";
// export type OPERATION = "OPERATION";
// export type CanvasMode =
//   | "EDITOR_MODE_EDIT"
//   | "EDITOR_MODE_CREATE"
//   | "EDITOR_MODE_OPERATION";

type EditorModeProps =
  | "EDITOR_MODE_EDIT"
  | "EDITOR_MODE_CREATE"
  | "EDITOR_MODE_OPERATION";

export type MimicCanvasStorage = {
  mode: CanvasMode;
  newElement: CanvasCreatedElement;
};

export type ElHistory = {
  index: Number;
  actions: [any];
  history: [MimicElementProps[]];
  past: [];
  present: [];
  future: [];
};

export type MimicStorage = {
  canvas: MimicCanvasStorage;
  frame: MimicElementProps;
  //history: ElHistory;
};

export type CanvasMimicProps = {
  mimic: MimicStorage;
  setEditorMode: Function;
};

export type BaseElementOutput = {
  attributes: InitAttributes | undefined;
  service: Service | undefined;
};

export interface CanvasNewElement extends BaseElementOutput {
  type: string | undefined;
}
