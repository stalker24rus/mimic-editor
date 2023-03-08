import { useSelector } from "react-redux";
import { selectScriptEditorState } from "../../../../store/selectors/editorState";
import getFunctionCode from "../../../../utils/ast/getFunctionCode";
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
      alert(1 + 2);
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

  // try {
  //   const res = getFunctionCode("onClick", text);
  //   const res2 = getFunctionCode("onClick", res.source);
  //   const res3 = res2.source.slice(
  //     res2.ast.body[0]?.body.start + 1,
  //     res2.ast.body[0]?.body.end - 1
  //   );
  //   const func = new Function(`${res2.source} onClick();`);
  //   console.log(func());
  //   console.log(res2);
  // } catch (error) {
  //   alert(error);
  // }

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
