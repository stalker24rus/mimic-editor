import lodash from "lodash";
import { IMimicElement, IPoint } from "../../../../models/Editor";
import rotateElementPoints from "../rotateElementPoints";

type FuncResult = [top: number, left: number, width: number, height: number];

interface AlignProps {
  selected: number[];
}

export function getAreaPointsByHWP(
  width: number,
  height: number,
  point: IPoint
): IPoint[] {
  return [
    point,
    { x: point.x + width, y: point.y },
    { x: point.x, y: point.y + height },
    { x: point.x + width, y: point.y + height },
  ];
}

function getBoxFromElements(elements: IMimicElement[]): FuncResult {
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
        angle | 0
      );
    }

    points = [...points, ...tempPoints];
    // points.push(...element.attributes.position.points);
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

  const result: FuncResult = [minY, minX, maxX - minX, maxY - minY];

  return result;
}

export const alignLeft =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = element.attributes.position.points;

          const slaveRect = getBoxFromElements([element]);

          for (let j = 0; j < points.length; j++) {
            if (baseElementRect[1] < slaveRect[1]) {
              elements[i].attributes.position.points[j].x =
                points[j].x - (slaveRect[1] - baseElementRect[1]);
            }

            if (baseElementRect[1] > slaveRect[1]) {
              elements[i].attributes.position.points[j].x =
                points[j].x + (baseElementRect[1] - slaveRect[1]);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export const alignRight =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = element.attributes.position.points;

          const slaveRect = getBoxFromElements([element]);

          for (let j = 0; j < points.length; j++) {
            if (
              baseElementRect[1] + baseElementRect[2] <
              slaveRect[1] + slaveRect[2]
            ) {
              elements[i].attributes.position.points[j].x =
                points[j].x -
                (slaveRect[1] +
                  slaveRect[2] -
                  (baseElementRect[1] + baseElementRect[2]));
            }

            if (
              baseElementRect[1] + baseElementRect[2] >
              slaveRect[1] + slaveRect[2]
            ) {
              elements[i].attributes.position.points[j].x =
                points[j].x +
                (baseElementRect[1] +
                  baseElementRect[2] -
                  (slaveRect[1] + slaveRect[2]));
            }
          }
        }
      }
      object.children = elements;
    }
  };

export const alignTop =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = element.attributes.position.points;

          const slaveRect = getBoxFromElements([element]);

          for (let j = 0; j < points.length; j++) {
            if (baseElementRect[0] < slaveRect[0]) {
              elements[i].attributes.position.points[j].y =
                points[j].y - (slaveRect[0] - baseElementRect[0]);
            }

            if (baseElementRect[0] > slaveRect[0]) {
              elements[i].attributes.position.points[j].y =
                points[j].y + (baseElementRect[0] - slaveRect[0]);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export const alignBottom =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = element.attributes.position.points;

          const slaveRect = getBoxFromElements([element]);

          for (let j = 0; j < points.length; j++) {
            if (
              baseElementRect[0] + baseElementRect[3] <
              slaveRect[0] + slaveRect[3]
            ) {
              elements[i].attributes.position.points[j].y =
                points[j].y -
                (slaveRect[0] +
                  slaveRect[3] -
                  (baseElementRect[0] + baseElementRect[3]));
            }

            if (
              baseElementRect[0] + baseElementRect[3] >
              slaveRect[0] + slaveRect[3]
            ) {
              elements[i].attributes.position.points[j].y =
                points[j].y +
                (baseElementRect[0] +
                  baseElementRect[3] -
                  (slaveRect[0] + slaveRect[3]));
            }
          }
        }
      }
      object.children = elements;
    }
  };

export const alignHorizon =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = [...element.attributes.position.points];

          const slaveRect = getBoxFromElements([element]);

          const baseHorizonCenter =
            (baseElementRect[1] + (baseElementRect[1] + baseElementRect[2])) /
            2;
          const slaveHorizonCenter =
            (slaveRect[1] + (slaveRect[1] + slaveRect[2])) / 2;

          for (let j = 0; j < points.length; j++) {
            if (baseHorizonCenter < slaveHorizonCenter) {
              elements[i].attributes.position.points[j].x =
                points[j].x - (slaveHorizonCenter - baseHorizonCenter);
            }

            if (baseHorizonCenter > slaveHorizonCenter) {
              elements[i].attributes.position.points[j].x =
                points[j].x + (baseHorizonCenter - slaveHorizonCenter);
            }
          }
        }
      }
      object.children = elements;
    }
  };

export const alignVertical =
  ({ selected }: AlignProps) =>
  (object: IMimicElement) => {
    const elements = object.children;

    if (selected.length > 1) {
      const baseId = selected[0];
      const slavesId = selected.slice(1);

      const index = elements.findIndex(
        (element: IMimicElement) => element.attributes.general.id === baseId
      );

      const baseElementRect = getBoxFromElements([elements[index]]);

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (slavesId.includes(element.attributes.general.id)) {
          const points = [...element.attributes.position.points];

          const slaveRect = getBoxFromElements([element]);

          const baseVerticalCenter =
            (baseElementRect[0] + (baseElementRect[0] + baseElementRect[3])) /
            2;
          const slaveVerticalCenter =
            (slaveRect[0] + (slaveRect[0] + slaveRect[3])) / 2;

          for (let j = 0; j < points.length; j++) {
            if (baseVerticalCenter < slaveVerticalCenter) {
              elements[i].attributes.position.points[j].y =
                points[j].y - (slaveVerticalCenter - baseVerticalCenter);
            }

            if (baseVerticalCenter > slaveVerticalCenter) {
              elements[i].attributes.position.points[j].y =
                points[j].y + (baseVerticalCenter - slaveVerticalCenter);
            }
          }
        }
      }
      object.children = elements;
    }
  };