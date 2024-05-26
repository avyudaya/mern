import { useState } from "react";

const App = () => {
  const [person, setPerson] = useState({
    name: '',
    gender: '',
  })
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");

  const handleSubmit = () => {
    if(newName === "" || newGender === ""){
      return;
    }

    const newPerson = {
      name: newName,
      gender: newGender,
    }
    setPerson(newPerson)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleGenderChange = (e) => {
    setNewGender(e.target.value)
  }

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={newName} onChange={handleNameChange}/>
      <label htmlFor="gender">Gender:</label>
      <input type="text" name="gender" value={newGender} onChange={handleGenderChange}/>
      <button onClick={handleSubmit}>Submit</button>
      <h1>{person.name}</h1>
      <h1>{person.gender}</h1>
    </div>
  )
}

export default App;
