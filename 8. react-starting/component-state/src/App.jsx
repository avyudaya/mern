import { useState } from "react";
import Display from "./Display";
import Button from "./Button";

const App = () => {
  const [counter, setCounter] = useState(1);
  const [liked, setMessage] = useState(false);

  const handleState = () => {
    if (liked === false) {
      increasedbyone();
    } else {
      decreasedbyone();
    }
    setMessage(!liked);
  };
  const increasedbyone = () => setCounter(counter + 1);
  const decreasedbyone = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={handleState} text={liked? "Unlike": "Like"} />
    </div>
  );
};
export default App;