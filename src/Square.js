import { useEffect } from "react";

const Square = (props) => {
  function renderColor() {
    switch (props.value) {
      case 0:
        return "black";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "gray";
    }
  }

  useEffect(() => {
    let decayTime;
    switch (props.value) {
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

    if (props.value !== null && props.value) {
      const timer = setTimeout(() => props.decay(), decayTime);
      return () => clearTimeout(timer);
    }
  }, [props.value]);

  return (
    <button
      className="square"
      onMouseDown={() => props.onClick()}
      style={{ backgroundColor: renderColor() }}
    />
  );
};

export default Square;
