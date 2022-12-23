import Appearance from "./Appearance";
import Custom from "./Custom";
import Font from "./Font";
import General from "./General";
import Position from "./Position";

interface IChangeData {
  name: string;
  value: number | string;
}

function PropsPanel({ attributes, onChange }) {
  const { general, appearance, font, position, properties } = attributes;

  const handleChange = (change: IChangeData) => {
    onChange({ id: general.id, ...change });
  };
  return (
    <div>
      {general && (
        <General
          data={general}
          onChange={(change) =>
            handleChange({ propFamily: "general", ...change })
          }
        />
      )}

      {appearance && (
        <Appearance
          data={appearance}
          onChange={(change) =>
            handleChange({ propFamily: "appearance", ...change })
          }
        />
      )}

      {font && (
        <Font
          data={font}
          onChange={(change) => handleChange({ propFamily: "font", ...change })}
        />
      )}

      {position && (
        <Position
          data={position}
          onChange={(change) =>
            handleChange({ propFamily: "position", ...change })
          }
        />
      )}

      {Object.keys(properties).length > 0 && (
        <Custom
          data={properties}
          onChange={(change) =>
            handleChange({ propFamily: "properties", ...change })
          }
        />
      )}
    </div>
  );
}
PropsPanel.defaultProps = {
  onChange: () => {},
};
export default PropsPanel;
