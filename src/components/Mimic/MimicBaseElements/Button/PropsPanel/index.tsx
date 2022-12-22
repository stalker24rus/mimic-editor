import { useCallback, useState } from "react";
import { ChromePicker } from "react-color";

interface IChangeData {
  [key: string]: number | string;
}

function PropsView({ title, children }) {
  const [expand, setExpand] = useState<boolean>(true);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <div style={{ display: "flex", height: "100%", background: "#ACACAC" }}>
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#ACACAC", width: "40px", height: "100%" }}
      >
        <button
          className="w-5 h-5 hover:bg-gray-200 flex items-center rounded-xl font-bold p-1 text-center"
          onClick={handleClick}
        >
          {expand ? "-" : "+"}
        </button>
      </div>

      <div style={{ background: "#ffffff", width: "100%" }}>
        <div style={{ background: "#ACACAC", width: "100%" }}>
          <>{title}</>
        </div>

        <div style={{ background: "#ffffff" }}>{expand && <>{children}</>}</div>
      </div>
    </div>
  );
}

function General({ data, onChange }) {
  const { id, name, tagName } = data;

  const handleChange = (ev) => {
    onChange({ [ev.target.name]: ev.target.value });
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
          <tr>
            <td>tagName:</td>
            <td>
              <input name="tagName" value={tagName} onChange={handleChange} />
            </td>
          </tr>
        </table>
      </PropsView>
    </>
  );
}

function Appearance({ data, onChange }) {
  const { fill, stroke, opacity, visability } = data;

  const [fiilColorView, setFillCollorView] = useState<boolean>(false);
  const [strokeColorView, setStrokeColorView] = useState<boolean>(false);

  const handleChange = (ev) => {
    onChange({ [ev.target.name]: ev.target.value });
  };

  const handleChangeColor = (fieldName, color) => {
    onChange({ [fieldName]: color.rgb });
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

const FONT_HORIZON_ALIGHN = ["left", "right", "middle"];

function Font({ data, onChange }) {
  const { fontFamily, fontSize, fontStyle, fontWeight, horizonAlign } = data;

  const handleChange = (ev) => {
    onChange({ [ev.target.name]: ev.target.value });
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

function Position({ data, onChange }) {
  const { angle, height, width, points } = data;

  const handleChange = (ev) => {
    onChange({ [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <PropsView title="Позиция">
        <table>
          {angle !== undefined && (
            <tr>
              <td>angle : </td>
              <td>
                <input
                  type="number"
                  name="angle"
                  value={angle}
                  style={{ width: "60px" }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {height !== undefined && (
            <tr>
              <td>height: </td>
              <td>
                <input
                  type="number"
                  name="height"
                  value={height}
                  style={{ width: "60px" }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {width !== undefined && (
            <tr>
              <td>width: </td>
              <td>
                <input
                  type="number"
                  name="width"
                  value={width}
                  style={{ width: "60px" }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          <tr>
            <div>points:</div>
            <div>
              <tr>
                <td style={{ width: "20px" }}> </td>
                <td>x</td>
                <td>y</td>
              </tr>

              {points.map((point, index) => {
                return (
                  <tr>
                    <td>{index}</td>

                    <td>
                      <input
                        type="number"
                        name={"point.x." + index}
                        style={{ width: "60px" }}
                        value={point.x}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        name={"point.y." + index}
                        style={{ width: "60px" }}
                        value={point.y}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                );
              })}
            </div>
          </tr>
        </table>
      </PropsView>
    </>
  );
}

function CustomProperties({ data, onChange }) {
  const handleChange = (ev) => {
    onChange({ [ev.target.name]: ev.target.value });
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

function PropsPanel({ id, attributes, onChange }) {
  const { general, appearance, font, position, properties } = attributes;

  const handleChange = (change: IChangeData) => {
    console.log({ id: general.id, ...change });
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
        <CustomProperties
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
  id: 0,
  onChange: () => {},
};
export default PropsPanel;
