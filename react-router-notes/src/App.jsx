import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Users from "./pages/Users";
import noteService from "./services/note";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Note from "./components/Note";

const App = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  const padding = {
    padding: "10px",
  };

  useEffect(() => {
    console.log("getting user");
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      console.log("got user");
      setUser(user);
      noteService.setToken(user.token);
    } else {
      console.log("no user");
    }
  }, []);

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => setNotes(response))
      .catch((error) => console.log(error));
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div className="container">
      <Router>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Navbar with text
            </Navbar.Brand>
            <Nav.Link style={padding} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link style={padding} as={Link} to="/notes">
              Notes
            </Nav.Link>
            <Nav.Link style={padding} as={Link} to="/users">
              Users
            </Nav.Link>
            <Navbar.Toggle />
            {user ? (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={padding}>
                  Signed in as: {user.username}
                </Navbar.Text>
              <button onClick={logOut}>Log out</button>{" "}

              </Navbar.Collapse>
            ) : (
              <Nav.Link style={padding} as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Container>
        </Navbar>

        <Routes>
          <Route path="/notes/:id" element={<Note notes={notes} />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={<Notes notes={notes} user={user} setNotes={setNotes} />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
