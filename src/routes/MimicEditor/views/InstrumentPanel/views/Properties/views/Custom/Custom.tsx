import { isNumeric } from "../../../../../../../../constants/functions/isNumeric";
import InputField from "../../../../../../../../ui/InputField";
import View from "../View";

function Custom({ freezed, data, onChange }) {
  const handleChange = (ev) => {
    onChange({
      name: ev.target.name,
      value: isNumeric(ev.target.value)
        ? parseFloat(ev.target.value)
        : ev.target.value,
    });
  };

  return (
    <>
      <View title="Доп. свойства">
        {Object.keys(data).map((keyName, i) => (
          <tr key={i}>
            <td>{keyName}: </td>
            <td>
              <InputField
                props={{
                  name: keyName,
                  disabled: freezed,
                }}
                value={data[keyName]}
                onChange={handleChange}
              />
            </td>
          </tr>
        ))}
      </View>
    </>
  );
}

export default Custom;
