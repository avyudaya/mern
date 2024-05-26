const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name:'State of a component',
      exercises: 14
    }
  ]
 
  return (
    <div>
      <Header course={course}/>
      <Content part={parts[0]}/>      
      <Content part={parts[1]}/>
      <Content part={parts[2]}/>
      {/* <Total total={part1.exercises+part2.exercises+part3.exercises}/> */}
    </div>
  )
} 

export default App;