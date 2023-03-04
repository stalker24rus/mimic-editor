import { useSelector } from "react-redux";
import { selectScriptEditorState } from "../../../../store/selectors/editorState";
import CodeView from "./views/CodeView";
import Header from "./views/Header";
import CloseButton from "./views/Header/views/CloseButton";
import EditorTitle from "./views/Header/views/EditorTitle";
import Tabs from "./views/Header/views/Tabs";
import Window from "./views/Window";

export default function ScriptEditor() {
  const { position, selected, opensScript, appearance } = useSelector(
    selectScriptEditorState
  );

  //
  // 1) Удаление переносов строк
  // 2) парсинг и разделение на функции -->> abstract syntax tree
  // 3) Подготовка для компонентов
  //

  // 1 Хранение функций в одном месте.
  // 2 Добавление изолированного интерпретатора
  // 3 ? как подключать внешние модули скрипты ?

  const text = `import getTag from "TagStore";
  
  class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  }

    function onClick(event) {
      return 1 + 2;
    }

    function onPointMove(event) {
      return 2 + 2;
    }

    function onPointUp(event) {
      return 3 + 2;
    }

    function onPointDown(event) {
      return 4 + 2;
    }  
  `;

  // let acorn = require("acorn");
  try {
    // const res = acorn.parse(text, { ecmaVersion: 2020, sourceType: "module" });
    // console.log(res);
    // console.log(res.body[1].start, res.body[1].end);
    // console.log(text.slice(res.body[1].start, res.body[1].end));

    const res = getFunctionCode("onPointMove", text);
    console.log(res);
  } catch (error) {
    alert(error);
  }

  return (
    <>
      <Window>
        <Header>
          {/* <EditorTitle /> */}
          <Tabs />
        </Header>
        <CodeView text={text} onChange={() => {}} />
      </Window>
    </>
  );
}

let acorn = require("acorn");
function getFunctionCode(funcName: string, source: string) {
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
      ast: ast.body[functionIndex],
    };
  } else {
    throw `Function ${funcName} was not found.`;
  }
}
