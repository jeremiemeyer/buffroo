//@ts-nocheck
import { createContext, useState } from "react"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "./WorkoutStatusProvider"

const WorkoutDataContext = createContext({})

export const WorkoutDataProvider = ({ children }) => {
  const { auth } = useAuth()
  const [timer, setTimer] = useState({})
  const [workoutData, setWorkoutData] = useState({
    name: "", // function that gets date and put "sunday morning workout" here
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
    setWorkoutData({...workoutData, notes: newNotes})
  }

  function handleEditWorkoutName(e) {
    const newName = e.target.value
    setWorkoutData({...workoutData, name: newName})
  }

  function addExercise(exercisename) {
    const exerciseToBeAdded = { name: exercisename, sets: [{ reps: "", weight: "", rpe: "" }] }
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
