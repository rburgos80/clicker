import Header from "./Header";
import Board from "./Board";
import HUD from "./HUD.js";
import React, { useState, useEffect } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [time, setTime] = useState(0);
  const [tick, setTick] = useState(0);
  const [score, setScore] = useState(0);
  const maxTime = 30;
  const levels = [3, 4, 5, 6, 6, 7, 8];
  let victory = false;

  //Runs when the start button is pressed
  function handleStart() {
    if (started) {
      return null;
    }
    setStarted(true);
    setTime(maxTime);
    setScore(0);
    resetTick();
    victory = false;
    setSquares((squares) => squares.fill(0));
    console.log("Game Started");
  }

  //Runs when timer ends or stop is pressed
  function handleStop() {
    setStarted(false);
    setTick(0);
    if (time !== 0) {
      setTime(0);
    }
    if (victory) {
      setSquares((squares) => squares.fill(9));
    } else {
      setSquares((squares) => squares.fill(null));
    }
    console.log("Game stopped");
  }

  //Light squares when game starts
  function lightSquare() {
    if (!squares.includes(0)) {
      handleStop();
      return null;
    }

    let randomSquareIndex = Math.floor(Math.random() * 25);
    while (
      squares[randomSquareIndex] !== 0 ||
      squares[randomSquareIndex] === null
    ) {
      randomSquareIndex = Math.floor(Math.random() * 25);
    }

    setSquares(
      squares.map((s, index) => (randomSquareIndex === index ? 3 : s))
    );
  }

  //Decreases the value of squares over time
  function decay(i) {
    if (squares[i] !== null && squares[i]) {
      if (squares[i] !== 1) {
        setSquares((squares) =>
          squares.map((s, index) => (i === index ? s - 1 : s))
        );
      } else {
        setSquares((squares) =>
          squares.map((s, index) => (i === index ? null : s))
        );
      }
    }
  }

  //Activate timer
  useEffect(() => {
    if (Math.floor(time > 0)) {
      const timer = setTimeout(() => setTime((time) => time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTime(0);
      victory = true;
      handleStop();
    }
  }, [time]);

  //Activate ticker
  useEffect(() => {
    if (tick > 0 && started) {
      const timer = setTimeout(() => setTick((tick) => tick - 1), 10);
      return () => clearTimeout(timer);
    } else if (started) {
      lightSquare();
      resetTick();
    }
  }, [tick]);

  //Reset tick to appropriate number for each level
  function resetTick() {
    let level = Math.floor(
      levels.length - 1 - (time / maxTime) * (levels.length - 1)
    );
    setTick(Math.floor(100 / levels[level]));
  }

  //Updates score and board when a square is clicked
  function handleClick(i) {
    if (!started) {
      return null;
    }
    switch (squares[i]) {
      case 0:
        setScore((score) => score - 50);
        setSquares(squares.map((val, ind) => (i === ind ? null : val)));
        break;
      case 1:
        setScore((score) => score + 10);
        setSquares(squares.map((val, ind) => (i === ind ? 0 : val)));
        break;
      case 2:
        setScore((score) => score + 15);
        setSquares(squares.map((val, ind) => (i === ind ? 0 : val)));
        break;
      case 3:
        setScore((score) => score + 20);
        setSquares(squares.map((val, ind) => (i === ind ? 0 : val)));
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <Header />
      <Board
        onClick={(i) => handleClick(i)}
        decay={(i) => decay(i)}
        squares={squares}
        maxTime={maxTime}
        timer={time}
      />
      <HUD
        time={parseFloat((Math.round(time * 100) / 100).toFixed(2))}
        score={score}
        started={started}
        handleStart={() => handleStart()}
        handleStop={() => handleStop()}
      />
    </div>
  );
}

export default App;
