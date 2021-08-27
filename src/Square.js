import { useState } from "react";

const Square = (props) => {
  function renderColor() {
    switch (props.value) {
      case 0:
        return "black";
      case 1:
        return "red";
      case 2:
        return "green";
      default:
        return "gray";
    }
  }

  return (
    <button
      className="square"
      onMouseDown={() => props.onClick()}
      style={{ backgroundColor: renderColor() }}
    />
  );
};

export default Square;
