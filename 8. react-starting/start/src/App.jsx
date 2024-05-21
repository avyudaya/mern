const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises: {props.total}
    </p>
  )
}

const App = () => {
  const course = "MERN";
  const part1 = "JS";
  const exercises1 = 10;
  const part2 = "React";
  const exercises2 = 7;

  return (
    <div>
      <Header course={course}/>
      <Content part={part1} exercises={exercises1}/>
      <Content part={part2} exercises={exercises2}/>
      <Total total={exercises1+exercises2}/>
    </div>
  )
} 

export default App;