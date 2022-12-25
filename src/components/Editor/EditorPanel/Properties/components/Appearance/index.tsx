import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import { AppearenceType } from "../../../../../../models/Editor";
import PropsView from "../PropsView";

interface Props {
  data: AppearenceType;
  onChange: Function;
}

interface HSLColor {
  a?: number | undefined;
  h: number;
  l: number;
  s: number;
}

interface RGBColor {
  a?: number | undefined;
  b: number;
  g: number;
  r: number;
}

interface ColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}

function Appearance({ data, onChange }: Props): JSX.Element {
  const { fill, stroke, opacity, strokeWidth, textColor, visability } = data;

  const [colorPanel, setColorPanel] = useState<boolean>(false);
  const [colorPanelCoor, setColorPanelCoor] = useState<boolean>(false);
  const [colorPanelParametr, setColorPanelParametr] = useState<string>("");

  const handleChange = (ev) => {
    onChange({
      name: ev.target.name,
      value: isNumeric(ev.target.value)
        ? parseFloat(ev.target.value)
        : ev.target.value,
    });
  };

  const handleOpenColorPanel = (ev) => {
    console.log(ev);
    const key = ev.target.name;
    setColorPanel(true);
    setColorPanelParametr(key);
  };

  const handleCloseColorPanel = () => {
    setColorPanel(false);
    setColorPanelParametr("");
  };

  const handleChangeColor = (color: ColorResult) => {
    const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    if (colorPanelParametr !== "") {
      onChange({ name: colorPanelParametr, value: rgba });
    }
  };

  return (
    <>
      <PropsView title="Появление">
        {colorPanel && data[colorPanelParametr] && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "125px",
              zIndex: "2",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "25px",
                background: "white",
                borderRadius: "2px",
              }}
            >
              <span
                style={{ position: "absolute", left: "10px", fontSize: "14px" }}
              >
                {colorPanelParametr}
              </span>
              <button
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  height: "15px",
                  width: "15px",
                  background: "red",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "8px",
                }}
                onClick={handleCloseColorPanel}
              >
                X
              </button>
            </div>

            <ChromePicker
              color={data[colorPanelParametr]}
              onChange={handleChangeColor}
            />
          </div>
        )}

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

                  <button name="fill" onClick={handleOpenColorPanel}>
                    {fill}
                  </button>
                </div>
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

                  <button name="stroke" onClick={handleOpenColorPanel}>
                    {stroke}
                  </button>
                </div>
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

                  <button name="textColor" onClick={handleOpenColorPanel}>
                    {textColor}
                  </button>
                </div>
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
                  value={visability ? "true" : "false"}
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