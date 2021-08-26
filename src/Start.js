const Start = (props) => {
  return (
    <button className="startButton" onClick={() => props.onClick()}>
      Start
      {props.click}
    </button>
  );
};

export default Start;
