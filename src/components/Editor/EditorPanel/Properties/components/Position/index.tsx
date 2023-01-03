import lodash from "lodash";
import { isNumeric } from "../../../../../../constants/functions/isNumeric";
import InputField from "../InputField";
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
                <InputField
                  value={angle}
                  props={{
                    style: { width: "60px" },
                    name: "angle",
                    type: "number",
                    min: -360,
                    max: 360,
                  }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {height !== undefined && (
            <tr>
              <td>height: </td>
              <td>
                <InputField
                  value={height}
                  props={{
                    style: { width: "60px" },
                    name: "height",
                    type: "number",
                    min: 0,
                    max: 999999,
                  }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {width !== undefined && (
            <tr>
              <td>width: </td>
              <td>
                <InputField
                  value={width}
                  props={{
                    style: { width: "60px" },
                    name: "width",
                    type: "number",
                    min: 0,
                    max: 999999,
                  }}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}
          {points !== undefined && (
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
                        <InputField
                          value={point.x}
                          props={{
                            style: { width: "60px" },
                            name: "points.x." + index,
                            type: "number",
                            min: 0,
                            max: 999999,
                          }}
                          onChange={handleChangePoints}
                        />
                      </td>

                      <td>
                        <InputField
                          value={point.y}
                          props={{
                            style: { width: "60px" },
                            name: "points.y." + index,
                            type: "number",
                            min: 0,
                            max: 999999,
                          }}
                          onChange={handleChangePoints}
                        />
                      </td>
                    </tr>
                  );
                })}
              </div>
            </tr>
          )}
        </table>
      </PropsView>
    </>
  );
}

export default Position;
