export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type CLASS_NAMED = `${string}`;

//FIXME from PointFromat to PointFormat
export interface IPoint {
  x: number;
  y: number;
}

export type LineAttributes = {
  points: IPoint[];
  stroke: string;
  strokeWidth: number;
};

export type Properties = {
  [key: string]: any;
  tag?: string;
};

export type ElementType =
  | "MAIN_FRAME"
  | "BUTTON"
  | "LINE"
  | "POLYGON"
  | "POLYLINE"
  | "GROUP";

export type IMimicElement = {
  type: ElementType;
  attributes: Attributes;
  children?: Array<IMimicElement>;
  freezed?: boolean;
  layer?: number; //TODO remove
};

export interface InitAttributes {
  position: PositionType;
  properties?: { [any: string]: any }; //TODO rename to custom It defines inside a component.
  appearance?: AppearenceType;
  animation?: Array<AnimationType>;
  action?: Action;
  font?: FontType;
}

export interface Attributes extends InitAttributes {
  general: GeneralElementType;
}

export type Service = {
  freezed?: boolean;
};

export type GeneralElementType = {
  id: number;
  name: string;
  tagName?: string | undefined;
};

export type AppearenceType = {
  fill?: RGB | RGBA | HEX | CLASS_NAMED;
  opacity?: number;
  stroke?: RGB | RGBA | HEX | CLASS_NAMED;
  strokeWidth?: number;
  textColor?: RGB | RGBA | HEX | CLASS_NAMED;
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
  horizonAlign:
    | "start"
    | "end"
    | "left"
    | "right"
    | "justify"
    | "center"
    | "match-parent";
};

export type PositionType = {
  points?: IPoint[];
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

export type PlaceOperation = "root" | "inner";

export type StackHistoryRecord = {
  action: string;
  prevState?: IMimicElement | undefined;
  nextState?: IMimicElement;
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
  component: IMimicElement;
  onClick?: Function;
  newElement?: boolean;
}

export interface BoxProps extends BaseHandlers {
  component: IMimicElement;
  isSelected: boolean;
  children: (props: ComponentProps) => JSX.Element;
}

/**
 * CANVAS TYPES
 */

export type BaseCanvasHandlers = {
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
  history: [IMimicElement[]];
  past: [];
  present: [];
  future: [];
};

export type MimicStorage = {
  canvas: MimicCanvasStorage;
  frame: IMimicElement;
};

export type CanvasMimicProps = {
  mimic: MimicStorage;
  setEditorMode: Function;
};

export type BaseElementOutput = {
  attributes: InitAttributes | undefined;
};

export interface CanvasNewElement extends BaseElementOutput {
  type: string | undefined;
}

interface IChangesData {
  id: number;
  propFamily: string;
  name: string;
  value: number | string;
}
