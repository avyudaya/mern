import { useEffect, useState } from "react";
import Note from "./Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  // variables
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => setNotes(response))
      .catch((err) => {
        setErrMessage("Can not get all notes.");
        setTimeout(() => {
          setErrMessage(null);
        }, 3000);
      });
  }, []);

  // called when form is submitted
  const addNote = (e) => {
    // does not refresh
    e.preventDefault();
    // new note obj
    const note = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    // send the data to the server and set the response as new notes
    noteService
      .create(note)
      .then((response) => {
        setNotes(notes.concat(response));
      })
      .catch((err) => {
        setErrMessage("The note can not be created. Please try again later.");
        setTimeout(() => {
          setErrMessage(null);
        }, 3000);
      });

    // set back to normal for next add on
    setNewNote("");
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log(changedNote);
    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id !== id ? n : response)));
      })
      .catch((error) => {
        console.log(error);
        setErrMessage("The note has already been deleted.");
        setTimeout(() => {
          setErrMessage(null);
        }, 3000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  // controls which notes to show on the basis of boolean
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes App</h1>
      <Notification errMessage={errMessage} />
      {/* button to change showAll boolean */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      {/* form to add the new note as an obj: calls addNote */}
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* showing all the filtered notes on the basis of boolean */}
      <h3>All Notes</h3>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        ))}
      </ul>
    </div>
  );
};

export default App;
