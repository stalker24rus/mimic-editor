import { useState } from "react";
import { ChromePicker } from "react-color";
import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import PropsView from "../PropsView";

function Appearance({ data, onChange }) {
  const { fill, stroke, opacity, strokeWidth, textColor, visability } = data;

  const [fiilColorView, setFillCollorView] = useState<boolean>(false);
  const [strokeColorView, setStrokeColorView] = useState<boolean>(false);
  const [textColorView, setTextColorView] = useState<boolean>(false);

  const handleChange = (ev) => {
    onChange({
      name: ev.target.name,
      value: isNumeric(ev.target.value)
        ? parseFloat(ev.target.value)
        : ev.target.value,
    });
  };

  const handleChangeColor = (fieldName, color) => {
    const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    console.log(rgba);
    onChange({ name: fieldName, value: rgba });
  };

  return (
    <>
      <PropsView title="Появление">
        <table>
          {fill !== undefined && (
            <tr>
              <td>fill</td>
              <td>
                <div style={{ display: "inline-flex" }}>
                  <div
                    style={{
                      margin: "2px",
                      height: "20px",
                      width: "20px",
                      border: "solid 1px",
                      background: fill,
                    }}
                  ></div>

                  <button onClick={() => setFillCollorView(!fiilColorView)}>
                    {fill}
                  </button>

                  {/* <input value={fill} /> */}
                </div>
                {fiilColorView && (
                  <div style={{ position: "absolute", zIndex: "2" }}>
                    <ChromePicker
                      color={fill}
                      onChange={(color) => handleChangeColor("fill", color)}
                    />
                  </div>
                )}
              </td>
            </tr>
          )}

          {stroke !== undefined && (
            <tr>
              <td>stroke</td>
              <td>
                <div style={{ display: "inline-flex" }}>
                  <div
                    style={{
                      margin: "2px",
                      height: "20px",
                      width: "20px",
                      border: "solid 1px",
                      background: stroke,
                    }}
                  ></div>

                  <button onClick={() => setStrokeColorView(!strokeColorView)}>
                    {stroke}
                  </button>

                  {/* <input value={fill} /> */}
                </div>
                {strokeColorView && (
                  <div style={{ position: "absolute", zIndex: "2" }}>
                    <ChromePicker
                      color={stroke}
                      onChange={(color) => handleChangeColor("stroke", color)}
                    />
                  </div>
                )}
              </td>
            </tr>
          )}

          {textColor !== undefined && (
            <tr>
              <td>textColor</td>
              <td>
                <div style={{ display: "inline-flex" }}>
                  <div
                    style={{
                      margin: "2px",
                      height: "20px",
                      width: "20px",
                      border: "solid 1px",
                      background: textColor,
                    }}
                  ></div>

                  <button onClick={() => setTextColorView(!textColorView)}>
                    {textColor}
                  </button>

                  {/* <input value={fill} /> */}
                </div>
                {textColorView && (
                  <div style={{ position: "absolute", zIndex: "2" }}>
                    <ChromePicker
                      color={textColor}
                      onChange={(color) =>
                        handleChangeColor("textColor", color)
                      }
                    />
                  </div>
                )}
              </td>
            </tr>
          )}

          {strokeWidth !== undefined && (
            <tr>
              <td>strokeWidth</td>
              <td>
                <input
                  name="strokeWidth"
                  style={{ width: "60px" }}
                  value={strokeWidth}
                  type="number"
                  step="1"
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {opacity !== undefined && (
            <tr>
              <td>opacity</td>
              <td>
                <input
                  name="opacity"
                  style={{ width: "60px" }}
                  value={opacity}
                  type="number"
                  step="0.01"
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {visability !== undefined && (
            <tr>
              <td>visability</td>
              <td>
                <select
                  name="opacity"
                  value={visability}
                  onChange={handleChange}
                >
                  <option>true</option>
                  <option>false</option>
                </select>
              </td>
            </tr>
          )}
        </table>
      </PropsView>
    </>
  );
}

export default Appearance;
