import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  // EFFECT care se executa doar o singura data la mount
  useEffect(() => {
    console.log("Component mounted for the first time!");
    document.title = "Welcome!";
  }, []); // <--- array gol = ruleaza o singura data

  return (
    <div className="container">
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
};

export default App;
