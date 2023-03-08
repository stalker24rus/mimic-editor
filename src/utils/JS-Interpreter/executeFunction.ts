import Interpreter from "js-interpreter";
import initEnvironmentCodeBase from "./initFunctions";

export default function executeFunction(
  script: string,
  executedFunctionName: string
) {
  const myInterpreter = new Interpreter(
    ` ${script} ${executedFunctionName}();`,
    initEnvironmentCodeBase
  );
  myInterpreter.run();
}
