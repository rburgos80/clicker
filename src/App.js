import Header from "./Header";
import Board from "./Board";
import HUD from "./HUD.js";
import React, { useState, useEffect } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  function handleStart() {
    if (started) {
      return null;
    }
    setStarted(true);
    setTime(60);
    setScore(0);
    setSquares(squares.fill(0));
    console.log("Game Started");
  }

  useEffect(() => {
    if (time > 0 && started) {
      setTimeout(() => setTime(time - 1), 1000);
    } else {
      setTime(0);
    }
  }, [time, started]);

  function handleStop() {
    setStarted(false);
    setTime(0);
    setSquares(squares.fill(null));
    console.log("Game stopped");
  }

  function handleClick(i) {
    if (!started) {
      return null;
    }

    console.log("click");
    switch (squares[i]) {
      case 0:
        setScore((score) => score - 5);
        break;
      case 1:
        setScore((score) => score + 10);
        setSquares(
          squares.map((val, index) => (i === index ? 0 : squares[index]))
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <Header />
      <Board onClick={(i) => handleClick(i)} squares={squares} />
      <HUD
        time={time}
        score={score}
        handleStart={() => handleStart()}
        handleStop={() => handleStop()}
      />
    </div>
  );
}

export default App;
