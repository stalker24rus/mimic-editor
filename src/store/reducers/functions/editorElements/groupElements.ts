import lodash from "lodash";
import { ELEMENT_TYPE_GROUP } from "../../../../constants/literals";
import { MimicElementProps } from "../../../../models/Editor";
import { getAreaPointsByHWP } from "../getAreaPointsByHWP";
import rotateElementPoints from "../rotateElementPoints";

interface Props {
  id: number;
  selected: number[];
}

type FuncResult = { y: number; x: number; width: number; height: number };

export function getBoxFromElements(elements: MimicElementProps[]): FuncResult {
  let minX: number;
  let maxX: number;
  let minY: number;
  let maxY: number;
  let points = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const {
      width,
      height,
      angle,
      points: oldPoints,
    } = element.attributes.position;

    let tempPoints = [...oldPoints];

    if (width && height !== undefined && oldPoints.length === 1) {
      const center = {
        x: tempPoints[0].x + width / 2,
        y: tempPoints[0].y + height / 2,
      };
      tempPoints = rotateElementPoints(
        center,
        getAreaPointsByHWP(width, height, tempPoints[0]),
        angle || 0
      );
    }

    points = [...points, ...tempPoints];
  }

  for (let j = 0; j < points.length; j++) {
    const point = points[j];

    // First step
    if (j === 0) {
      minX = point.x;
      maxX = point.x;
      minY = point.y;
      maxY = point.y;
    }

    // Update states
    if (point.x < minX) {
      minX = point.x;
    }

    if (point.y < minY) {
      minY = point.y;
    }

    if (point.x > maxX) {
      maxX = point.x;
    }

    if (point.y > maxY) {
      maxY = point.y;
    }
  }

  return { y: minY, x: minX, width: maxX - minX, height: maxY - minY };
}

const groupElements =
  ({ id, selected }: Props) =>
  (object: MimicElementProps) => {
    // 1 get group element and clean objects
    const rawGroup = lodash.remove(
      object.children,
      (element: MimicElementProps) =>
        selected.includes(element.attributes.general.id)
    );

    // 2 calculate group rectangle
    const groupRect = getBoxFromElements(rawGroup);

    for (let i = 0; i < rawGroup.length; i++) {
      const points = rawGroup[i].attributes.position.points.map(function (
        point
      ) {
        return {
          x: point.x - groupRect.x,
          y: point.y - groupRect.y,
        };
      });
      rawGroup[i].attributes.position.points = points;
      rawGroup[i].freezed = true;
    }

    const newGroupElement: MimicElementProps = {
      type: ELEMENT_TYPE_GROUP,
      attributes: {
        appearance: {
          opacity: 1,
          visability: true,
        },
        properties: {},
        position: {
          points: [
            {
              x: groupRect.x,
              y: groupRect.y,
            },
          ],
          width: groupRect.width,
          height: groupRect.height,
        },
        general: { id: id, name: ELEMENT_TYPE_GROUP + id },
        animation: [],
      },
      children: [...rawGroup],
      freezed: false,
    };

    // 3 add grouped element
    object.children.push(newGroupElement);
  };

export default groupElements;
