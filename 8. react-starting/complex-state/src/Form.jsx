
const Form = ({name, age, setName, setAge, submitResults}) => {
    return (
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="age">Age</label>
            <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />

            <button onClick={submitResults}>Submit</button>
        </div>
    );
}

export default Form;
