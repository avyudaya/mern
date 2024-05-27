import { useState } from "react";
import Form from "./Form";

const App = () => {

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [age1, setAge1] = useState("");
  const [age2, setAge2] = useState("");

  const [comparisonResult, setComparisonResult] = useState("");

  const [person1, setPerson1] = useState({
    name: '',
    age: ''
  })
  const [person2, setPerson2] = useState({
    name: '',
    age: ''
  })

  const submitResult2 = () => {
    console.log(name2, age2);

    if(name2 === "" || age2 === ""){
      return;
    } 

    setPerson2({
      name: name2,
      age: age2
    })

    setName2("");
    setAge2("");
  }

  const compareTwo = () => {
    if (person1.age > person2.age) {
      const diff = parseInt(person1.age) - parseInt(person2.age);
      setComparisonResult(`${person1.name} is ${diff} years older than ${person2.name}`);
    } else {
      const diff = parseInt(person2.age) - parseInt(person1.age);
      setComparisonResult(`${person2.name} is ${diff} years older than ${person1.name}`);
    }
  }


  const submitResult1 = () => {
    console.log(name1, age1);

    if(name1 === "" || age1 === ""){
      return;
    } 

    setPerson1({
      name: name1,
      age: age1
    })

    setName1("");
    setAge1("");
  }

  return (
    <div>
      <h1>Forms</h1>
      <Form name={name1} age={age1} setName={setName1} setAge={setAge1} submitResults={submitResult1}/>
      <Form name={name2} age={age2} setName={setName2} setAge={setAge2} submitResults={submitResult2}/>

      {person1.name != "" && person2.name != "" && <button onClick={compareTwo}>Compare</button>}

      <h1>{comparisonResult}</h1>
    </div>
  );
}

export default App;
