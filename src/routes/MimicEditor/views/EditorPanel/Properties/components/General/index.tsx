import { isNumeric } from "../../../../../../../constants/functions/isNumeric";
import View from "../View";

function General({ freezed, data, onChange }) {
  const { id, name, tagName } = data;

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
      <View title="Главные">
        <table>
          <tr>
            <td>id: </td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>name:</td>
            <td>
              <input
                name="name"
                value={name}
                onChange={handleChange}
                disabled={freezed || false}
              />
            </td>
          </tr>
          {tagName && (
            <tr>
              <td>tagName:</td>
              <td>
                <input
                  name="tagName"
                  value={tagName}
                  onChange={handleChange}
                  disabled={freezed || false}
                />
              </td>
            </tr>
          )}
        </table>
      </View>
    </>
  );
}

export default General;
