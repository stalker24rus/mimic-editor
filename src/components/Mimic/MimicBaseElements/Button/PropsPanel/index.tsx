import { useCallback, useState } from "react";
import { ChromePicker } from "react-color";

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

function General({ data }) {
  const { id, name, tagName } = data;

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
              <input value={name} />
            </td>
          </tr>
          <tr>
            <td>tagName:</td>
            <td>
              <input value={tagName} />
            </td>
          </tr>
        </table>
      </PropsView>
    </>
  );
}

function Appearance({ data }) {
  const { fill, stroke, opacity, visability } = data;

  const [fiilColorView, setFillCollorView] = useState<boolean>(false);
  const [strokeColorView, setStrokeColorView] = useState<boolean>(false);

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
                      onChange={(color) => console.log(color)}
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
                      onChange={(color) => console.log(color)}
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
                  style={{ width: "60px" }}
                  value={opacity}
                  type="number"
                  step="0.01"
                />
              </td>
            </tr>
          )}

          {visability !== undefined && (
            <tr>
              <td>visability</td>
              <td>
                <select
                  value={visability}
                  onChange={(event) => console.log(event.target.value)}
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

function Font({ data }) {
  const { fontFamily, fontSize, fontStyle, fontWeight, horizonAlign } = data;
  return (
    <>
      <PropsView title="Шрифт">
        <table>
          <tr>
            <td>fontFamily:</td>
            <td>
              <select
                value={fontFamily}
                onChange={(event) => console.log(event.target.value)}
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
              <input style={{ width: "60px" }} value={fontSize} type="number" />
            </td>
          </tr>

          <tr>
            <td>fontStyle:</td>
            <td>
              <select
                value={fontStyle}
                onChange={(event) => console.log(event.target.value)}
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
                value={fontWeight}
                onChange={(event) => console.log(event.target.value)}
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
                value={horizonAlign}
                onChange={(event) => console.log(event.target.value)}
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

function Position({ data }) {
  const { angle, height, width, points } = data;

  return (
    <>
      <PropsView title="Позиция">
        <table>
          {angle !== undefined && (
            <tr>
              <td>angle : </td>
              <td>
                <input style={{ width: "60px" }} value={angle} type="number" />
              </td>
            </tr>
          )}

          {height !== undefined && (
            <tr>
              <td>height: </td>
              <td>
                <input style={{ width: "60px" }} value={height} type="number" />
              </td>
            </tr>
          )}

          {width !== undefined && (
            <tr>
              <td>width: </td>
              <td>
                <input style={{ width: "60px" }} value={width} type="number" />
              </td>
            </tr>
          )}

          <tr>
            <div>points:</div>
            <div>
              <tr>
                <td>index</td>
                <td>x</td>
                <td>y</td>
              </tr>

              {points.map((point, index) => {
                return (
                  <tr>
                    <td>{index}</td>

                    <td>
                      <input
                        style={{ width: "60px" }}
                        value={point.x}
                        type="number"
                      />
                    </td>

                    <td>
                      <input
                        style={{ width: "60px" }}
                        value={point.y}
                        type="number"
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

function CustomProperties({ data }) {
  return (
    <>
      <PropsView title="Доп. свойства">
        {Object.keys(data).map((keyName, i) => (
          <tr key={i}>
            <td>{keyName}: </td>
            <td>
              <input value={data[keyName]} />
            </td>
          </tr>
        ))}
      </PropsView>
    </>
  );
}

function PropsPanel({ id, attributes, onChange }) {
  const { general, appearance, font, position, properties } = attributes;

  // console.log(attributes);
  return (
    <div>
      {general && <General data={general} />}

      {appearance && <Appearance data={appearance} />}

      {font && <Font data={font} />}

      {position && <Position data={position} />}

      {Object.keys(properties).length > 0 && (
        <CustomProperties data={properties} />
      )}
    </div>
  );
}
PropsPanel.defaultProps = {
  id: 0,
  onChange: () => {},
};
export default PropsPanel;
