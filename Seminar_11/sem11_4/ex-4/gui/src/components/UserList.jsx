import { useEffect, useState } from "react";
import User from "./User";
import "./UserList.css";

const SERVER = "http://localhost:8080";

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list">
      {users.map((u) => (
        <div key={u.id} onClick={() => onSelectUser(u)}>
          <User item={u} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
