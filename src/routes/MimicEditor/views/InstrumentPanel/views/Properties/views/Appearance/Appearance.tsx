import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { isNumeric } from "../../../../../../../../utils/isNumeric";
import { AppearenceType } from "../../../../../../../../models/Editor";
import ColorSample from "../../../../../../../../ui/ColorSample";
import InputField from "../../../../../../../../ui/Forms/InputField";
import View from "../View";

interface Props {
  freezed: boolean;
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

function Appearance({ freezed, data, onChange }: Props): JSX.Element {
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
    ev.preventDefault();
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
      <View title="Появление">
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
                  <ColorSample fill={fill} />
                  <button
                    name="fill"
                    onClick={handleOpenColorPanel}
                    disabled={freezed || false}
                  >
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
                  <ColorSample fill={stroke} />
                  <button
                    name="stroke"
                    onClick={handleOpenColorPanel}
                    disabled={freezed || false}
                  >
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
                  <ColorSample fill={textColor} />
                  <button
                    name="textColor"
                    onClick={handleOpenColorPanel}
                    disabled={freezed || false}
                  >
                    {stroke}
                  </button>
                </div>
              </td>
            </tr>
          )}

          {strokeWidth !== undefined && (
            <tr>
              <td>strokeWidth</td>
              <td>
                <InputField
                  value={strokeWidth}
                  props={{
                    name: "strokeWidth",
                    type: "number",
                    min: 1,
                    max: 100,
                    step: 1,
                    disabled: freezed,
                  }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {opacity !== undefined && (
            <tr>
              <td>opacity</td>
              <td>
                <InputField
                  value={opacity}
                  props={{
                    style: { width: "60px" },
                    name: "opacity",
                    type: "number",
                    min: 0,
                    max: 1,
                    step: 0.01,
                    disabled: freezed,
                  }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {/* {visability !== undefined && (
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
          )} */}
        </table>
      </View>
    </>
  );
}

export default Appearance;
