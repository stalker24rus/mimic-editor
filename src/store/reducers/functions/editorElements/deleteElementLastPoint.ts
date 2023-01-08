import { IMimicElement } from "../../../../models/Editor";

const deleteElementLastPoint = () => (object: IMimicElement) => {
  const points = object.attributes.position.points || [];
  points.pop();
  // object.attributes.position.points = points;
};

export default deleteElementLastPoint;
