import getElementAttributes from "./ApplicationAPI/getElementAttributes";
import setElementAttributes from "./ApplicationAPI/setElementAttributes";

const initEnvironmentCodeBase = (interpreter: any, scope: any) => {
  let alertWrapper = function (text) {
    return window.alert(text);
  };

  let consoleWrapper = function (text) {
    return console.log(text);
  };

  interpreter.setProperty(
    scope,
    "alert",
    interpreter.createNativeFunction(alertWrapper)
  );

  interpreter.setProperty(
    scope,
    "console",
    interpreter.createNativeFunction(consoleWrapper)
  );

  // Application API functions
  const api = interpreter.nativeToPseudo({});
  interpreter.setProperty(scope, "api", api);
  interpreter.setProperty(api, "fast", 99);

  const wrapApiGetElement = function getElement(name) {
    return getElementAttributes(name);
  };

  const wrapApiSetElementAttributes = function setAttributes(
    name,
    propFamily,
    propName,
    value
  ) {
    return setElementAttributes(name, propFamily, propName, value);
  };

  interpreter.setProperty(
    api,
    "getElement",
    interpreter.createNativeFunction(wrapApiGetElement)
  );

  interpreter.setProperty(
    api,
    "setElementAttributes",
    interpreter.createNativeFunction(wrapApiSetElementAttributes)
  );
};

export default initEnvironmentCodeBase;
