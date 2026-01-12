import { useReducer } from "react";

const initialState = {
  tasks: ["Task 1", "Task 2"],
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

const Tasks = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Listă Task-uri</h2>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      <button
        onClick={() => dispatch({ type: "ADD_TASK", payload: "Task Nou" })}
      >
        Adaugă Task
      </button>

      {}
      <button
        onClick={() => dispatch({ type: "RESET_STATE" })}
        style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
      >
        Resetează Starea
      </button>
    </div>
  );
};

export default Tasks;
