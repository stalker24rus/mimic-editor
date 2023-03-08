const acorn = require("acorn");

export default function getFunctionCode(funcName: string, source: string) {
  const ast = acorn.parse(source, { ecmaVersion: 2020, sourceType: "module" });
  const functionIndex = ast.body.findIndex(
    (node) => node.type === "FunctionDeclaration" && funcName === node.id.name
  );

  if (functionIndex > -1) {
    return {
      source: source.slice(
        ast.body[functionIndex].start,
        ast.body[functionIndex].end
      ),
      ast: ast,
    };
  } else {
    throw `Function ${funcName} was not found.`;
  }
}
