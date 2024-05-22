import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseClick = () => {
    setCounter(counter+1)
  };

  const decreaseClick = () => {
    setCounter(counter-1)
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseClick}>plus</button>
      <button onClick={decreaseClick}></button>
    </div>
  );
};

export default App;