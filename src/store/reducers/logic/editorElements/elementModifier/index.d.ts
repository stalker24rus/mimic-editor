import { IPoint } from "../../../../../models/Editor";

interface IPointProp {
  point: IPoint;
}

interface IChangeAttributeProp {
  propFamily: string;
  name: string;
  value: string | number;
}

interface IChangeElementPoint {
  pointNo: number;
  point: IPoint;
}

interface IResizeElementProp {
  targetName: string;
  point: IPoint;
}
