import "./User.css";

function RegularUser({ item }) {
  return (
    <div className="user regular">
      <div className="username">{item.username}</div>
      <div className="fullName">{item.fullName}</div>
      <div className="role">USER</div>
    </div>
  );
}

export default RegularUser;
