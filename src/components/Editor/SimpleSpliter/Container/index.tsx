function Container({ percent, isHorizontally, children }) {
  return (
    <div
      style={{
        height: isHorizontally ? `${percent}%` : "100%",
        width: isHorizontally ? "100%" : `${percent}%`,
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  );
}

Container.defaultProps = {
  isHorizontally: false,
};

export default Container;
