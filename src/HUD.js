import Start from "./Start";

const HUD = (props) => {
  return (
    <div>
      <div className="stats">
        <div className="timer"> Timer: {props.time} </div>
        <div className="score"> Score: {props.score} </div>
      </div>
      <Start onClick={() => props.handleStart()} />
      <Start onClick={() => props.handleStop()} />
    </div>
  );
};

export default HUD;
