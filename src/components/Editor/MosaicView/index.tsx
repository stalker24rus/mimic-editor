import React from "react";

export interface ViewProps {
  name: string;
  img: string;
  onClick: Function;
}

export interface MosaicProps {
  elements: ViewProps[];
}

function View({ name, img, onClick }: ViewProps): JSX.Element {
  const handleClick = (ev: React.PointerEvent<HTMLDivElement>) => {
    onClick(ev);
  };

  return (
    <div
      className="bg-gray-500 hover:bg-gray-700"
      style={{
        cursor: "pointer",
        margin: "2px",
        position: "relative",
        borderRadius: "10px",
        border: "solid rgba(4,4,4,0.35) 1px",
        // background: "rgba(150,150,150,0.35)",
        height: "100px",
        width: "100px",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          top: "4px",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
      >
        <img
          alt="future"
          src={img}
          style={{
            height: "60px",
            width: "90px",
          }}
        />
      </div>

      <div
        className="flex items-center"
        style={{
          maxWidth: "100%",
          position: "absolute",
          bottom: "0px",
          color: "rgba(255,255,255,1)",
          fontSize: "12px",
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
      >
        {name}
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
