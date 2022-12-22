import { useCallback, useState } from "react";

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
            <td>tagName</td>
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
  const { fill, opacity, visability } = data;

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

                  <input value={fill} />
                </div>
              </td>
            </tr>
          )}

          {opacity !== undefined && (
            <tr>
              <td>opacity</td>
              <td>
                <input value={opacity} />
              </td>
            </tr>
          )}

          {visability !== undefined && (
            <tr>
              <td>visability</td>
              <td>
                <input value={visability} />
              </td>
            </tr>
          )}
        </table>
      </PropsView>
    </>
  );
}

function Font({ data }) {
  const { fontFamily, fontSize, fontStyle, fontWeight, horizonAlign } = data;
  return (
    <>
      <PropsView title="Шрифт">
        <table>
          <tr>
            <td>fontFamily</td>
            <td>
              <input value={fontFamily} />
            </td>
          </tr>

          <tr>
            <td>fontSize</td>
            <td>
              <input value={fontSize} />
            </td>
          </tr>

          <tr>
            <td>fontStyle</td>
            <td>
              <input value={fontStyle} />
            </td>
          </tr>

          <tr>
            <td>fontWeight</td>
            <td>
              <input value={fontWeight} />
            </td>
          </tr>

          <tr>
            <td>horizonAlign</td>
            <td>
              <input value={horizonAlign} />
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
                <input style={{ width: "60px" }} value={angle} />
              </td>
            </tr>
          )}

          {height !== undefined && (
            <tr>
              <td>height: </td>
              <td>
                <input style={{ width: "60px" }} value={height} />
              </td>
            </tr>
          )}

          {width !== undefined && (
            <tr>
              <td>width: </td>
              <td>
                <input style={{ width: "60px" }} value={width} />
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
                      <input style={{ width: "60px" }} value={point.x} />
                    </td>

                    <td>
                      <input style={{ width: "60px" }} value={point.y} />
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
