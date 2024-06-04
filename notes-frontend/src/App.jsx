import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/notes");
    promise.then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, []);

  return <div>
    <h1>Notes</h1>
    {notes.map((note) => <li key={note.id}>{note.content}</li>)}
  </div>;
};

export default App;
