import { useState } from "react";

const App = () => {

  // variables
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  // called when form is submitted
  const addNote = (e) => {
    // does not refresh
    e.preventDefault();
    // new note obj
    const note = {
      id: notes.length + 1,
      note: newNote,
      important: Math.random() < 0.5,
    }
    // new note obj concatenated to the old array and its state is updated
    setNotes(notes.concat(note))
    // set back to normal for next add on
    setNewNote('')
  };

  // controls which notes to show on the basis of boolean
  const notesToShow = showAll?
    notes
    : notes.filter(note => note.important === true)

  
  return (
    <div>
      <h1>Notes App</h1>
      {/* button to change showAll boolean */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important': 'all'}
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
        {
          notesToShow.map((note) => (
            <li key={note.id}>
              {note.note}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
