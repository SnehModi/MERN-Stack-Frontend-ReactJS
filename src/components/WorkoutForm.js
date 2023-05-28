import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("http://localhost:5000/api/workouts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setLoad("");
      setReps("");
      setTitle("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("New Workout Added.", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      {error && <div className="error">{error}</div>}
      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button>Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
