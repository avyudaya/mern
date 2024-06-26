import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Users from "./pages/Users";
import noteService from "./services/notes";

import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Login from "./pages/Login";

const App = () => {

  const [user, setUser] = useState(null);

  const padding = {
    padding: '10px'
  }

  useEffect(() => {
    console.log("getting user")
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

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
        <Route path="/" element={<Home/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App;