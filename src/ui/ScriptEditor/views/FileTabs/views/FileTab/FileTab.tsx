/**
 *  interface IFile{        //      EXAMPLE
 *    name: string;         //
 *    extension: string;    //
 *    content: string;      //
 *    path: string;         //
 *    save: Function        //    .save(code); - for save changes
 * }
 */

export default function FileTab({ active, value, onClick, onSave, onClose }) {
  const handleOnClick = () => {
    onClick();
  };

  const handleOnSave = () => {
    onSave();
  };

  const handleOnClose = () => {
    onClose();
  };
  return (
    <span style={{ margin: "10px" }}>
      <button onClick={handleOnClick}>
        {!value.isSaved && <span>*</span>}
        {value.path}/{value.name}.{value.extension}
      </button>
      {!value.isSaved && <button onClick={handleOnSave}>&#128190;</button>}

      <button onClick={handleOnClose}>X</button>
    </span>
  );
}
