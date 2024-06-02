import { useState } from "react";
import Form from "./Form";
import Display from "./Display";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [persons, setPersons] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const validateData = () => {
    if (name === "" || age === "") {
      alert("Name and age cannot be empty");
      return false;
    }
    if(name.length < 3){
      alert("Name should be at least 3 characters long");
      return false;
    }
    if(isNaN(parseInt(age))){
      alert("Age must be a number");
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    const validate = validateData();
    if(!validate){
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: name,
      age: age,
    };
    setPersons(persons.concat(newPerson));

    setName("");
    setAge("");
  };

  return (
    <div>
      <Form
        name={name}
        age={age}
        handleNameChange={handleNameChange}
        handleAgeChange={handleAgeChange}
        handleSubmit={handleSubmit}
      />
      <Display persons={persons}/>
    </div>
  );
};

export default App;