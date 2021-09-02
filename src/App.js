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
  const levels = [4, 6, 8, 10, 12];
  // let timeouts = Array(25).fill(null);

  //Runs when the start button is pressed
  function handleStart() {
    if (started) {
      return null;
    }
    setStarted(true);
    setTime(maxTime);
    setScore(0);
    resetTick();
    setSquares(squares.fill(0));
    console.log("Game Started");
  }

  //Runs when timer ends or stop is pressed
  function handleStop() {
    setStarted(false);
    setTick(0);
    if (time !== 0) {
      setTime(0);
    }
    setSquares(squares.fill(null));
    console.log("Game stopped");
  }

  //Reset tick to appropriate number for each level
  function resetTick() {
    let level = Math.floor(
      levels.length - 1 - (time / maxTime) * (levels.length - 1)
    );
    console.log(level);
    setTick(Math.floor(100 / levels[level]));
  }

  //Light squares when game starts
  function lightSquare() {
    if (!squares.includes(0)) {
      handleStop();
      return null;
    }

    let randomSquareIndex = Math.floor(Math.random() * 25);
    while (
      squares[randomSquareIndex] === 1 ||
      squares[randomSquareIndex] === null
    ) {
      randomSquareIndex = Math.floor(Math.random() * 25);
    }

    setSquares(
      squares.map((s, index) => (randomSquareIndex === index ? 1 : s))
    );

    // timeouts[randomSquareIndex] = setTimeout(
    //   () =>
    //     setSquares(
    //       squares.map((s, index) => (randomSquareIndex === index ? 0 : s))
    //     ),
    //   1000
    // );
  }

  //Activate timer
  useEffect(() => {
    if (Math.floor(time > 0)) {
      const timer = setTimeout(() => setTime((time) => time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTime(0);
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

  function handleClick(i) {
    if (!started) {
      return null;
    }

    switch (squares[i]) {
      case 0:
        setScore((score) => score - 25);
        setSquares(squares.map((val, ind) => (i === ind ? null : val)));
        break;

      //do this when a lit up square is clicked
      case 1:
        setScore((score) => score + 10);
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
