import { useMemo, useState } from "react";

export interface IMenuObject {
  text: number | string | JSX.Element;
  isDisabled: boolean;
  handler?: Function;
  separator?: "top" | "bottom";
  content?: IMenuObject | IMenuObject[]; // not use - reserved
}

interface IProps {
  text: string;
  menu: IMenuObject[];
}

export default function Menu({ text, menu }: IProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleToggleShow = () => {
    setShow((prev) => !prev);
  };

  const memoMenu = useMemo(
    () =>
      menu?.map((element, index) => (
        <li key={index}>
          <button
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50"
            style={{
              width: "100%",
            }}
            onClick={() => element.handler()}
            disabled={element.isDisabled}
          >
            {element.text}
          </button>
        </li>
      )),
    [menu]
  );

  return (
    <>
      <button
        className="text-white bg-grey-700 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
        // style={{
        //   height: HEADER_HEIGHT,
        // }}
        onClick={handleToggleShow}
      >
        {text}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {show && (
        <div
          className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          style={{
            // top: HEADER_HEIGHT,
            position: "absolute",
            left: 0,
          }}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {memoMenu}
          </ul>
        </div>
      )}
    </>
  );
}
