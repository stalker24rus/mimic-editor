import { useState } from "react";
import CodeView from "./views/CodeView/CodeView";
import FileTabs from "./views/FileTabs";

/**
 *  interface IFile{           //      EXAMPLE
 *    elementID: number | UUID //
 *    name: string;            //
 *    extension: string;       //
 *    content: string;         //
 *    path: string;            //
 *    save: Function;          //    .save(code); - for save changes
 *    isSaved: boolean;        //
 * }
 */

/**
 * interface IProps{
 *    openFiles: IFile[];
 *    viewComponet: JSX.Component;
 * }
 * */

export default function ScriptEditor({ openFiles, onChange }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleOnTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleOnChange = (code) => {
    let newFiles = [...openFiles];
    newFiles[activeTab] = {
      ...openFiles[activeTab],
      content: code,
      isSaved: false,
    };
    onChange(newFiles);
  };

  const handleOnSaveTab = (tabNumber) => {
    let newFiles = [...openFiles];
    try {
      newFiles[tabNumber].save();
      newFiles[tabNumber] = {
        ...openFiles[tabNumber],
        isSaved: true,
      };
      onChange(newFiles);
    } catch (error) {
      alert(error);
    }
  };

  const handleOnCloseTab = (tabNumber) => {
    try {
      let newFiles = [...openFiles];
      newFiles.splice(tabNumber, 1);
      onChange(newFiles);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {openFiles.length > 0 && (
        <FileTabs
          files={openFiles}
          onSetActiveTab={handleOnTabClick}
          onSaveTab={handleOnSaveTab}
          onCloseTab={handleOnCloseTab}
        />
      )}
      {openFiles.length > 0 && openFiles[activeTab] && (
        <CodeView
          value={openFiles[activeTab].content}
          onChange={handleOnChange}
        />
      )}
    </>
  );
}
