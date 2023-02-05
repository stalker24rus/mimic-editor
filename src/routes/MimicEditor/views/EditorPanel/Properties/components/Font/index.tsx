import { isNumeric } from "../../../../../../../constants/functions/isNumeric";
import InputField from "../../../../../../../ui/InputField";
import View from "../View";

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

function Font({ freezed, data, onChange }) {
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
      <View title="Шрифт">
        <table>
          <tr>
            <td>fontFamily:</td>
            <td>
              <select
                value={fontFamily}
                name="fontFamily"
                onChange={handleChange}
                disabled={freezed || false}
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
              <InputField
                value={fontSize}
                props={{
                  style: { width: "60px" },
                  name: "fontSize",
                  type: "number",
                  min: 1,
                  max: 1000,
                  disabled: freezed,
                }}
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
                disabled={freezed || false}
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
                disabled={freezed || false}
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
                disabled={freezed || false}
              >
                {FONT_HORIZON_ALIGHN.map((font, i) => (
                  <option key={i}>{font}</option>
                ))}
              </select>
            </td>
          </tr>
        </table>
      </View>
    </>
  );
}

export default Font;
