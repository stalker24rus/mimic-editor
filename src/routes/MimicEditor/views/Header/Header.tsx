import { APP_VERSION, HEADER_HEIGHT } from "../../../../constants/literals";
import MenuEdit from "./views/MenuEdit";
import MenuPlacing from "./views/MenuPlacing";

const Header = (): JSX.Element => {
  return (
    <div
      className="bg-gradient-to-r from-gray-900 to-gray-50"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="inline-flex" id="Component" style={{ top: 0, left: 0 }}>
        <div className="text-1xl text-center font-small text-white  align-middle m-1">
          <div style={{ fontSize: "18px" }}>MIMIC_EDITOR</div>
          <div style={{ fontSize: "10px" }}> {APP_VERSION}</div>
        </div>
        <MenuEdit />
        <MenuPlacing />
      </div>
    </div>
  );
};

export default Header;
