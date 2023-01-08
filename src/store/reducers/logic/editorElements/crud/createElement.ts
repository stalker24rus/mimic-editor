import {
  IMimicElement,
  ElementType,
  IPoint,
  Attributes,
} from "../../../../../models/Editor";

interface Props {
  id: number;
  type: ElementType;
  attributes: Attributes;
  point: IPoint;
  pointsAmount: number;
}

const createElement =
  ({ id, type, attributes, point, pointsAmount }: Props) =>
  (object: IMimicElement) => {
    const element = {
      type: type,
      layer: id,
      attributes: {
        ...attributes,
        position: {
          ...attributes.position,
          points: pointsAmount <= 1 ? [point] : [point, point],
        },
        general: { id: id, name: type + id, tagName: "" },
      },
      children: [],
    };

    object.children.push(element);
  };

export default createElement;
