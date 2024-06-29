import { useEffect, useState } from "react";
import noteService from "../services/note";
import {
  Link,
} from 'react-router-dom'

const Notes = ({ user, notes, setNotes }) => {
  
  const [newNote, setNewNote] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  // called when form is submitted
  const addNote = async (e) => {
    // does not refresh
    e.preventDefault();
    // new note obj
    const note = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    try {
      const response = await noteService.create(note);
      setNotes(notes.concat(response));
    } catch (ex) {
      setErrMessage("The note can not be created. Please try again later.");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }

    // set back to normal for next add on
    setNewNote("");
  };

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );

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

  return (
    <div>
      <h1>Notes</h1>
      <hr />
      {user && noteForm()}
      <hr />
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
          {/* <button onClick={() => toggleImportance(note.id)}>{label}</button> */}
        </li>
      ))}
    </div>
  );
};

export default Notes;
