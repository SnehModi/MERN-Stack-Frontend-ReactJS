import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workout, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:5000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workout &&
          workout.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
