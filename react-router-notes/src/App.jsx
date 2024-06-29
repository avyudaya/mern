import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Users from "./pages/Users";
import noteService from "./services/note";

import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Login from "./pages/Login";
import Note from "./components/Note";

const App = () => {

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  const padding = {
    padding: '10px'
  }

  useEffect(() => {
    console.log("getting user")
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      console.log("got user")
      setUser(user)
      noteService.setToken(user.token)
    } else {
      console.log("no user")
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => setNotes(response))
      .catch((error) => console.log(error));
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <Router>

      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user ?
          <em>{user.username} logged in <button onClick={logOut}>Log out</button> </em>
          : <Link style={padding} to="/login">Login</Link>
        }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes}/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/notes" element={<Notes notes={notes} user={user} setNotes={setNotes}/>}/>
        <Route path="/users" element={user? <Users/>: <Navigate replace to="/login"/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App;