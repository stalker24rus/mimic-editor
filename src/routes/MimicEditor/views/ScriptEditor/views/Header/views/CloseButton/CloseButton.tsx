export default function CloseButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return <div onClick={handleClick}>X</div>;
}
