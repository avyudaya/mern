const Form = ({name, age, handleNameChange, handleAgeChange, handleSubmit}) => {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={name} onChange={handleNameChange} />
      <label htmlFor="age">Age:</label>
      <input type="number" name="age" value={age} onChange={handleAgeChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
