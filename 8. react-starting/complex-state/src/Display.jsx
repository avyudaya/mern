const Display = ({ persons }) => {
  if(persons.length == 0){
    return (
      <div>
        <h1>No person added yet.</h1>
      </div>
    )
  }

  const listItems = persons.map(person => {
    return (
      <div key={person.id}>
        <h2>Name: {person.name}</h2>
        <h2>Age: {person.age}</h2>
      </div>
    )
  })

  return <div>
    {listItems}
  </div>
};

export default Display;
