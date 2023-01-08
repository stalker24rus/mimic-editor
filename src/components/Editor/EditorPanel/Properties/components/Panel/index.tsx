import Appearance from "../Appearance";
import Custom from "../Custom";
import Font from "../Font";
import General from "../General";
import Position from "../Position";

import "./index.css";

interface ChangeDataProps {
  freezed: boolean;
  name: string;
  value: number | string;
}

function Panel({ freezed, attributes, onChange }) {
  const { general, appearance, font, position, properties } = attributes;

  const handleChange = (change: ChangeDataProps) => {
    onChange({ id: general.id, ...change });
  };
  return (
    <div className="noselect">
      {freezed && (
        <div
          style={{
            width: "100%",

            background: "red",
            color: "white",
          }}
        >
          <span style={{ marginLeft: "15px" }}>Только чтение</span>
        </div>
      )}
      {general && (
        <General
          freezed={freezed}
          data={general}
          onChange={(change) =>
            handleChange({ propFamily: "general", ...change })
          }
        />
      )}

      {appearance && (
        <Appearance
          freezed={freezed}
          data={appearance}
          onChange={(change) =>
            handleChange({ propFamily: "appearance", ...change })
          }
        />
      )}

      {font && (
        <Font
          freezed={freezed}
          data={font}
          onChange={(change) => handleChange({ propFamily: "font", ...change })}
        />
      )}

      {position && (
        <Position
          freezed={freezed}
          data={position}
          onChange={(change) =>
            handleChange({ propFamily: "position", ...change })
          }
        />
      )}

      {Object.keys(properties).length > 0 && (
        <Custom
          freezed={freezed}
          data={properties}
          onChange={(change) =>
            handleChange({ propFamily: "properties", ...change })
          }
        />
      )}
    </div>
  );
}
Panel.defaultProps = {
  onChange: () => {},
};
export default Panel;
