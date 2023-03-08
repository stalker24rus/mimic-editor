import setTagValue from "./setTagValue";

const globalFunctions = function (interpreter, globalObject) {
  // Create 'robot' global object.
  var tags = interpreter.nativeToPseudo({});
  interpreter.setProperty(globalObject, "robot", tags);

  // Define 'robot.fast' property.
  interpreter.setProperty(tags, "fast", 99);

  const wrapperSetTagValue = function (tagName, value) {
    return setTagValue(tagName, value);
  };

  interpreter.setProperty(
    tags,
    "setTagValue",
    interpreter.createNativeFunction(wrapperSetTagValue)
  );
};

export default globalFunctions;
