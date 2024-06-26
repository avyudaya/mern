import noteService from "../services/notes";
import loginService from "../services/login";
import { useState } from "react";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const marginTop = {
    marginTop: 10,
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      noteService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (ex) {
      setErrMessage("Wrong username or password.");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }
  };

  return (
    <form style={marginTop} onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
