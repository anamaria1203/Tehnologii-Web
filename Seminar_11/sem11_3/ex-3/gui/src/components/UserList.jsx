import { useEffect, useState } from "react";
import AdminUser from "./AdminUser";
import RegularUser from "./RegularUser";
import "./UserList.css";

const SERVER = "http://localhost:8080";

function UserList() {
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
      {users.map((u) =>
        u.type === "admin" ? (
          <AdminUser key={u.id} item={u} />
        ) : (
          <RegularUser key={u.id} item={u} />
        )
      )}
    </div>
  );
}

export default UserList;
