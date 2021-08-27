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
  const maxTime = 5;
  const levels = [3, 4, 5, 6, 8];
  let timeouts = Array(25).fill(null);

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

  function handleStop() {
    setStarted(false);
    if (time != 0) {
      setTime(0);
    }
    setSquares(squares.fill(null));
    console.log("Game stopped");
  }

  //Reset tick to appropriate number for each level
  function resetTick() {
    let level = Math.floor((time / maxTime) * levels.length);
    setTick(Math.floor(100 / levels[level]));
  }

  //Light squares when game starts
  function lightSquare() {
    if (!squares.includes(0)) {
      console.log("no empty squares");
      return null;
    }

    let randomSquareIndex = Math.floor(Math.random() * 25);
    while (squares[randomSquareIndex]) {
      randomSquareIndex = Math.floor(Math.random() * 25);
    }

    setSquares(
      squares.map((s, index) => (randomSquareIndex === index ? 1 : s))
    );

    console.log(squares);

    // timeouts[randomSquareIndex] = setTimeout(
    //   setSquares(
    //     squares.map((s, index) => (randomSquareIndex === index ? 0 : s))
    //   ),
    //   1000
    // );
  }

  //Activate timer
  useEffect(() => {
    if (Math.floor(time > 0)) {
      setTimeout(() => setTime((time) => time - 0.01), 10);
    } else {
      setTime(0);
      handleStop();
    }
  }, [time]);

  // useEffect(() => {
  //   if (tick > 0 && started) {
  //     setTimeout(
  //       setTick((tick) => tick - 1),
  //       10
  //     );
  //   } else {
  //     lightSquare();
  //     resetTick();
  //   }
  // }, [tick, started]);

  // useEffect(() =>{
  //   if (started){

  //   }
  //   else{
  //     clearInterval
  //   }
  // }, [started]);

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
