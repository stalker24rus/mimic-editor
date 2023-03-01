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

  const text = `
    // 1 Хранение функций в одном месте. 
    // 2 Парсинг и выделение нужной функции 

    function onClick(event) {

    }

    function onPointMove(event) {

    }

    function onPointUp(event) {

    }

    function onPointDown(event) {

    }  
  `;

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
