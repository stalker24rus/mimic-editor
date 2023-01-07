import React from "react";

export interface ViewProps {
  name: string;
  img: string;
  demo?: JSX.Element;
  onClick: Function;
}

export interface MosaicProps {
  elements: ViewProps[];
}

function View({ name, img, demo, onClick }: ViewProps): JSX.Element {
  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    onClick(ev);
  };

  return (
    <div
      className="bg-gray-100 hover:bg-gray-300"
      style={{
        cursor: "pointer",
        margin: "2px",
        position: "relative",
        borderRadius: "20px",
        height: "100px",
        width: "100px",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        {demo && <>{demo}</>}
      </div>
    </div>
  );
}

function MosaicView({ elements }: MosaicProps): JSX.Element {
  return (
    <div className="flex flex-wrap">
      {elements.map((element, i) => (
        <View key={i} {...element} />
      ))}
    </div>
  );
}

export default MosaicView;
