import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>About Page</h1>
      <p>Aceasta este componenta nou creată pentru tema de astăzi.</p>
      <button onClick={() => navigate("/")}>Înapoi la Home</button>
    </div>
  );
};

export default About;
