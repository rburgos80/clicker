import Square from "./Square";

const Board = (props) => {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        decay={() => props.decay(i)}
        onClick={() => props.onClick(i)}
      />
    );
  }

  let list = [];
  for (let i = 0; i < 5; i++) {
    list.push(
      <div key={i}>
        {renderSquare(i * 5)}
        {renderSquare(i * 5 + 1)}
        {renderSquare(i * 5 + 2)}
        {renderSquare(i * 5 + 3)}
        {renderSquare(i * 5 + 4)}
      </div>
    );
  }

  return <div>{list}</div>;
};

export default Board;
