//@ts-nocheck
import { createContext, useState } from "react"

const WorkoutDataContext = createContext({})

export const WorkoutDataProvider = ({ children }) => {
  const [workoutData, setWorkoutData] = useState({
    name: "",
    startdate: "",
    enddate: "",
    exercises: [],
    notes: "",
  })

  function resetWorkout() {
    setWorkoutData({
      name: "",
      startdate: "",
      enddate: "",
      exercises: [],
      notes: "",
    })
  }

  function handleEditWorkoutNotes(e) {
    const newNotes = e.target.value
    setWorkoutData({ ...workoutData, notes: newNotes })
  }

  function handleEditWorkoutName(e) {
    const newName = e.target.value
    setWorkoutData({ ...workoutData, name: newName })
  }

  function addExercise(exercise) {
    const exerciseToBeAdded = {
      name: exercise.name,
      sets: [{ reps: "", weight: "", rpe: "" }],
      exerciseId: exercise._id,
    }
    const updatedExercises = [...workoutData.exercises, exerciseToBeAdded]
    setWorkoutData({ ...workoutData, exercises: updatedExercises })
  }

  return (
    <WorkoutDataContext.Provider
      value={{
        workoutData,
        setWorkoutData,
        handleEditWorkoutNotes,
        handleEditWorkoutName,
        addExercise,
        resetWorkout,
      }}
    >
      {children}
    </WorkoutDataContext.Provider>
  )
}

export default WorkoutDataContext
