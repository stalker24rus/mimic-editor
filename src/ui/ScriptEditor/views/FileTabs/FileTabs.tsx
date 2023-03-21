/**
 *  interface IFile{        //      EXAMPLE
 *    name: string;         //
 *    extension: string;    //
 *    content: string;      //
 *    path: string;         //
 *    save: Function        //    .save(code); - for save changes
 * }
 */

import { useState } from "react";
import FileTab from "./views/FileTab";

export default function FileTabs({
  files,
  onSetActiveTab,
  onSaveTab,
  onCloseTab,
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleOnSetActiveTab = (tabNumber) => {
    setActiveTab(tabNumber);
    onSetActiveTab(tabNumber);
  };

  const handleOnSave = (tabNumber) => {
    onSaveTab(tabNumber);
  };

  const handleOnCloseTab = (tabNumber) => {
    onCloseTab(tabNumber);
  };

  return (
    <>
      {files.map((file, tabNumber) => {
        return (
          <FileTab
            key={tabNumber}
            active={tabNumber === activeTab}
            value={file}
            onClick={() => handleOnSetActiveTab(tabNumber)}
            onSave={() => handleOnSave(tabNumber)}
            onClose={() => handleOnCloseTab(tabNumber)}
          />
        );
      })}{" "}
    </>
  );
}
