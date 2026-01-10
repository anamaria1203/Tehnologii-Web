import React, { useState } from "react";

const App = () => {
  const [steps, setSteps] = useState(0);

  return (
    <div className="container">
      {/* CONDITIONAL RENDERING */}
      {steps < 10 ? (
        <p>Today you've taken {steps} steps.</p>
      ) : (
        <p>You've walked more than 10 steps!</p>
      )}

      <button onClick={() => setSteps(steps + 1)}>Click Me</button>
    </div>
  );
};

export default App;
