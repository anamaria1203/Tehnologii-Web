import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home</h1>
      <button onClick={() => navigate("/tasks")}>Go to tasks</button>
      <button onClick={() => navigate("/about")} style={{ marginLeft: "10px" }}>
        Go to About
      </button>
    </div>
  );
};

export default Home;
