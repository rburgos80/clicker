const Square = (props) => {
  let color;

  switch (props.value) {
    case 0:
      color = "black";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "green";
      break;
    default:
      color = "gray";
      break;
  }
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{ backgroundColor: { color } }}
    />
  );
};

export default Square;
