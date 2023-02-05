import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../literals";
import Button from "../../ui/mimic/Primitives/Button";
import Line from "../../ui/mimic/Primitives/Line";
import Polygon from "../../ui/mimic/Primitives/Polygon";
import Polyline from "../../ui/mimic/Primitives/Polyline";
import Group from "../../ui/mimic/Service/Group";
import MoverBox from "../../components/Mimic/Transformers/MoverBox";
import MultiObjectBox from "../../components/Mimic/Transformers/MultiObjectBox";
import RectangleBox from "../../components/Mimic/Transformers/RectangleBox";
import { BaseProps } from "../../hooks/useDraw/index";

export const TransformerBase: BaseProps = {
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
