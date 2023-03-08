import { functionAlert } from "./jsAPI";

const initEnvironmentCodeBase = (interpreter: any, globalObject: any) => {
  interpreter.setProperty(
    globalObject,
    "alert",
    interpreter.createNativeFunction(functionAlert)
  );
};

export default initEnvironmentCodeBase;
