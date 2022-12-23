import lodash from "lodash";
import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import PropsView from "../PropsView";

function Position({ data, onChange }) {
  const { angle, height, width, points } = data;

  const handleChange = (ev) => {
    onChange({
      name: ev.target.name,
      value: isNumeric(ev.target.value)
        ? parseFloat(ev.target.value)
        : ev.target.value,
    });
  };

  const handleChangePoints = (ev) => {
    let newPoints = lodash.cloneDeep(points);
    const [name, axis, index] = ev.target.name.split(".");
    newPoints[parseInt(index)][axis] = parseInt(ev.target.value);

    onChange({ name: name, value: newPoints });
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
                        name={"points.x." + index}
                        style={{ width: "60px" }}
                        value={point.x}
                        onChange={handleChangePoints}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        name={"points.y." + index}
                        style={{ width: "60px" }}
                        value={point.y}
                        onChange={handleChangePoints}
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

export default Position;
