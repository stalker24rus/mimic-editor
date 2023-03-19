import Interpreter from "js-interpreter";
import initEnvironmentCodeBase from "./initFunctions";

export default function executeFunction(
  script: string,
  executedFunctionName: string
) {
  const apiInterpreter = new Interpreter(
    ` ${script} ${executedFunctionName}();`,
    initEnvironmentCodeBase
  );
  apiInterpreter.run();
  // console.log(apiInterpreter.value);
}
