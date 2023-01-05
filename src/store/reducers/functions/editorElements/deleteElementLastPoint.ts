import { MimicElementProps } from "../../../../models/Editor";

const deleteElementLastPoint = () => (object: MimicElementProps) => {
  const points = object.attributes.position.points || [];
  points.pop();
  // object.attributes.position.points = points;
};

export default deleteElementLastPoint;
