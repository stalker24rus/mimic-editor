import { EditorModeProps, ElementType } from "../../models/Editor";
export const APP_VERSION: string = "v.0.0.1:20";
export const HEADER_HEIGHT: number = 52;
export const MIMIC: string = "MIMIC";
export const MIMIC_FRAME_ID: string = `${MIMIC}.FRAME`;

export const EDITOR_MODE_EDIT: EditorModeProps = "EDITOR_MODE_EDIT";
export const EDITOR_MODE_CREATE: EditorModeProps = "EDITOR_MODE_CREATE";
export const EDITOR_MODE_OPERATE: EditorModeProps = "EDITOR_MODE_OPERATION";

export const ELEMENT_TYPE_FRAME: ElementType = "MAIN_FRAME";
export const ELEMENT_TYPE_BUTTON: ElementType = "BUTTON";
export const ELEMENT_TYPE_LINE: ElementType = "LINE";
export const ELEMENT_TYPE_POLYGON: ElementType = "POLYGON";
export const ELEMENT_TYPE_POLYLINE: ElementType = "POLYLINE";
export const ELEMENT_TYPE_GROUP: ElementType = "GROUP";

export const BOX_TOP_LEFT = "resize-top-left";
export const BOX_TOP_RIGHT = "resize-top-right";
export const BOX_BOTTOM_LEFT = "resize-bottom-left";
export const BOX_BOTTOM_RIGHT = "resize-bottom-right";
export const BOX_TOP_SIDE = "resize-top";
export const BOX_BOTTOM_SIDE = "resize-bottom";
export const BOX_LEFT_SIDE = "resize-left";
export const BOX_RIGHT_SIDE = "resize-right";

export const HISTORY_MAX_LENGHT: number = 50;
