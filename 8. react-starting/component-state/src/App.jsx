import { useState } from "react";
import Display from "./Display";
import Button from "./Button";

const App = () => {
  const [counter, setCounter] = useState(1);
  const [liked, setLiked] = useState(false);

  const handleState = () => {
    if (liked === false) {
      increasedbyone();
      setLiked(true)
    } else {
      decreasedbyone();
      setLiked(false)
    }
  };

  const increasedbyone = () => setCounter(counter + 1);
  const decreasedbyone = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={handleState} text="Like" status={liked} />
      <Button onClick={handleState} text="Unlike" status={!liked} />
    </div>
  );
};
export default App;