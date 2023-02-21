export default function ColorSample({ fill }) {
  return (
    <span
      style={{
        margin: "2px",
        height: "20px",
        width: "20px",
        borderRadius: "7px",
        background: fill,
        border: "solid 1px #E0E0E0",
      }}
    ></span>
  );
}
