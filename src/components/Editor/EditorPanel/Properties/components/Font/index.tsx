import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import PropsView from "../PropsView";

const FONT_FAMILY = [
  "Arial",
  "Verdana",
  "Tahoma",
  "Helvetica",
  "Georgia",
  "Times New Roman",
];

const FONT_STYLE = ["normal", "italic", "oblique", "inherit"];

const FONT_WEIGHT = ["bold", "bolder", "lighter", "normal"];

const FONT_HORIZON_ALIGHN = [
  "start",
  "end",
  "left",
  "right",
  "justify",
  "center",
  "match-parent",
];

function Font({ data, onChange }) {
  const { fontFamily, fontSize, fontStyle, fontWeight, horizonAlign } = data;

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
      <PropsView title="Шрифт">
        <table>
          <tr>
            <td>fontFamily:</td>
            <td>
              <select
                value={fontFamily}
                name="fontFamily"
                onChange={handleChange}
              >
                {FONT_FAMILY.map((font, i) => (
                  <option key={i}>{font}</option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>fontSize:</td>
            <td>
              <input
                name="fontSize"
                style={{ width: "60px" }}
                value={fontSize}
                type="number"
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>fontStyle:</td>
            <td>
              <select
                name="fontStyle"
                value={fontStyle}
                onChange={handleChange}
              >
                {FONT_STYLE.map((font, i) => (
                  <option key={i}>{font}</option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>fontWeight:</td>
            <td>
              <select
                name="fontWeight"
                value={fontWeight}
                onChange={handleChange}
              >
                {FONT_WEIGHT.map((font, i) => (
                  <option key={i}>{font}</option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>horizonAlign:</td>
            <td>
              <select
                name="horizonAlign"
                onChange={handleChange}
                value={horizonAlign}
              >
                {FONT_HORIZON_ALIGHN.map((font, i) => (
                  <option key={i}>{font}</option>
                ))}
              </select>
            </td>
          </tr>
        </table>
      </PropsView>
    </>
  );
}

export default Font;
