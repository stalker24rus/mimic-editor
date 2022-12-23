import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import PropsView from "../PropsView";

function Custom({ data, onChange }) {
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
      <PropsView title="Доп. свойства">
        {Object.keys(data).map((keyName, i) => (
          <tr key={i}>
            <td>{keyName}: </td>
            <td>
              <input
                name={keyName}
                value={data[keyName]}
                onChange={handleChange}
              />
            </td>
          </tr>
        ))}
      </PropsView>
    </>
  );
}

export default Custom;
