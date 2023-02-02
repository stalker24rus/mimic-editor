import { IMimicElement } from "../../../../models/Editor";

const deleteElementLastPoint = () => (object: IMimicElement) => {
  const points = object.attributes.position.points || [];
  points.pop();
};

export default deleteElementLastPoint;
