import {useState} from 'react'

const App = () => {

  const [counter, setCounter] = useState(5);

  setTimeout(() => {
    setCounter(100);
  }, 1000)

  return (
    <div>{counter}</div>
  )
}


export default App
