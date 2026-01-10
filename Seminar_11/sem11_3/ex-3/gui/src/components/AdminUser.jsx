import "./User.css";

function AdminUser({ item }) {
  return (
    <div className="user admin">
      <div className="username">{item.username}</div>
      <div className="fullName">{item.fullName}</div>
      <div className="role">ADMIN</div>
    </div>
  );
}

export default AdminUser;
