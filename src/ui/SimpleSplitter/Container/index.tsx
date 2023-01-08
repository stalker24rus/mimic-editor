/**
 * The Container is the view for the child component of the SimpleSplitter.
 *
 * Only "horizontal" or "vertical" values are allowed.
 * Vertical orientation is default value.
 * If not allowed value is inserted into the orientation field, the vertical orientation will be set by default.
 *
 * @param {number} slice  This is the percentage of the view to display.
 * @param {Orientation} orientation This is the orientation mode value. May contain a "horizontal" or "vertical" value.
 * @param {JSX.Element | JSX.Element[]} children
 * @returns
 */
function Container({
  slice,
  orientation,
  children,
}: ContainerProps): JSX.Element {
  const height = orientation === "horizontal" ? `${slice}%` : "100%";
  const width = orientation === "horizontal" ? "100%" : `${slice}%`;

  return (
    <div
      style={{
        height,
        width,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

Container.defaultProps = {
  slice: 50,
  orientation: "vertical",
};

export default Container;
