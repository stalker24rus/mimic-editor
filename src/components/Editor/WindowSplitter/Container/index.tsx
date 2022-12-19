function Container({ percent, isHorizontally, children }) {
  console.log("percent", percent);
  return (
    <div
      style={{
        height: isHorizontally ? `${percent}vh` : "100%",
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
