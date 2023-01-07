import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import PropsView from "../PropsView";

function General({ data, onChange }) {
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
      <PropsView title="Главные">
        <table>
          <tr>
            <td>id: </td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>name:</td>
            <td>
              <input name="name" value={name} onChange={handleChange} />
            </td>
          </tr>
          {tagName && (
            <tr>
              <td>tagName:</td>
              <td>
                <input name="tagName" value={tagName} onChange={handleChange} />
              </td>
            </tr>
          )}
        </table>
      </PropsView>
    </>
  );
}

export default General;
