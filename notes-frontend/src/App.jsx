import { useEffect, useState } from "react";
import Note from "./Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  // variables
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    console.log("getting user")
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password})
      
      setUser(user);
      noteService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUsername("");
      setPassword("");
    } catch(ex) {
      setErrMessage("Wrong username or password.");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }
  }

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
    } catch(ex) {
      setErrMessage("The note can not be created. Please try again later.");
        setTimeout(() => {
          setErrMessage(null);
        }, 3000);
    }
    
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
        username
        <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
        password
        <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
  );

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

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      <h1>Notes App</h1>
      <Notification errMessage={errMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.username} logged in</p>
        <button onClick={logOut}>Log out</button>
        {noteForm()}
        </div>}
      
      {/* button to change showAll boolean */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      {/* form to add the new note as an obj: calls addNote */}
      

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
