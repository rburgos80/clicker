import { useEffect } from "react";

const Square = ({ value, decay, onClick }) => {
  function renderColor() {
    switch (value) {
      case 0:
        return "black";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      case 9:
        return "green";
      default:
        return "gray";
    }
  }

  useEffect(() => {
    let decayTime;
    switch (value) {
      case 3:
        decayTime = 750;
        break;
      case 2:
        decayTime = 1000;
        break;
      case 1:
        decayTime = 1500;
        break;
      default:
        break;
    }

    if (value !== null && value <= 3 && value) {
      const timer = setTimeout(() => decay(), decayTime);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <button
      className="square"
      onMouseDown={() => onClick()}
      style={{ backgroundColor: renderColor() }}
    />
  );
};

export default Square;
