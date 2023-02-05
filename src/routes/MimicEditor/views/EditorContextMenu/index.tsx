import React, { createRef, useEffect, useState } from "react";

function EditorContextMenu(props) {
  const { children } = props;
  const divRef = createRef<HTMLDivElement>();

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  });

  const [isVisible, setIsVisible] = useState(false);
  const [top, setTop] = useState("0px");
  const [left, setLeft] = useState("0px");

  const handleContextMenu = (event) => {
    event.preventDefault();

    setIsVisible(true);

    const clickX = event.clientX;
    const clickY = event.clientY;
    const current = divRef.current;
    const screenW = current.parentElement.offsetWidth;
    const screenH = current.parentElement.offsetHeight;

    const rootW = current.offsetWidth;
    const rootH = current.offsetHeight;

    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;

    if (right) {
      setLeft(`${clickX + 5}px`);
    }

    if (left) {
      setLeft(`${clickX - rootW - 5}px`);
    }

    if (top) {
      setTop(`${clickY + 5}px`);
    }

    if (bottom) {
      setTop(`${clickY - rootH - 5}px`);
    }
  };

  const handleClick = (event) => {
    //const wasOutside = !(event.target.contains === this.root);
    //if (wasOutside && isVisible) setIsVisible(false);
    setIsVisible(false);
  };

  const handleScroll = () => {
    if (isVisible) setIsVisible(false);
  };

  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        width: "200px",
        minHeight: "100px",
        background: "white",
        left,
        top,
        borderRadius: "10px",
      }}
      hidden={!isVisible}
    >
      {children}
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => console.log("копировать")}
      >
        Копировать
      </button>
      <button
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        onClick={() => console.log("удалить")}
      >
        Удалить
      </button>
    </div>
  );
}

export default EditorContextMenu;
