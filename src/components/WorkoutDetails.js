import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:5000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log("ID: ", workout._id);
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.result });
      console.log("Workout Deleted.", json.result);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      {/* <input type="hidden" name="_id" value={workout._id} /> */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
