const HUD = (props) => {
  return (
    <div>
      <div className="stats">
        <div className="timer"> Timer: {props.time} </div>
        <div className="score"> Score: {props.score} </div>
      </div>
      {!props.started ? (
        <button className="startButton" onClick={() => props.handleStart()}>
          {" Start "}
        </button>
      ) : (
        <button className="stopButton" onClick={() => props.handleStop()}>
          {" Stop "}
        </button>
      )}
    </div>
  );
};

export default HUD;
