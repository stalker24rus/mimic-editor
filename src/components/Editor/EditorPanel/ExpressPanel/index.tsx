import BackLevel from "./icons/BackLevel";
import BottomAlign from "./icons/BottomAlign";
import BottomLevel from "./icons/BottomLevel";
import ForwardLevel from "./icons/ForwardLevel";
import HorizonAlign from "./icons/HorizonAlign";
import LeftAlign from "./icons/LeftAlign";
import RightAlign from "./icons/RightAlign";
import TopAlign from "./icons/TopAlign";
import TopLevel from "./icons/TopLevel";
import VerticalAlign from "./icons/VerticalAlign";

function ExpressPanel() {
  return (
    <div
      className="flex inline-flex"
      style={{
        width: "100%",
        borderBottom: "1px solid",
        overflowX: "scroll",
      }}
    >
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <LeftAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <HorizonAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <RightAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <TopAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <VerticalAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <BottomAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <ForwardLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <BackLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <TopLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded `}
      >
        <BottomLevel />
      </button>
    </div>
  );
}

export default ExpressPanel;
