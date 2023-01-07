import { MimicElementProps } from "../../../../models/Editor";

interface Props {
  id: number;
}

const unGroupElements =
  ({ id }: Props) =>
  (object: MimicElementProps) => {
    // 1 calculate ungroup array of elements
    // 2 remove group element
    // 3 add elements
  };

export default unGroupElements;
