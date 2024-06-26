import { useEffect, useState } from "react";
import userService from "../services/user";

const Users = () => {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    userService.getAll()
      .then(response => setUsers(response))
      .catch(error => console.log(error));
  }, []);


  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
          <li key={user.id}>
            {user.username}
            {user.name}
          </li>
        ))}
    </div>
  )
  }
  
  export default Users;