//@ts-nocheck
import { createContext, useState } from "react"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "./WorkoutStatusProvider"

const WorkoutDataContext = createContext({})

export const WorkoutDataProvider = ({ children }) => {
  const { auth } = useAuth()
  const [workoutData, setWorkoutData] = useState({
    userId: "",
    startdate: new Date().toISOString(),
    enddate: "",
    exercises: [],
    notes: "",
  })

  const [workoutNotes, setWorkoutNotes] = useState("")

  function resetWorkout() {
    setWorkoutData({
      userId: "",
      startdate: new Date().toISOString(),
      enddate: "",
      exercises: [],
      notes: "",
    })
  }

  function handleEditWorkoutNotes(e) {
    const newNotes = e.target.value
    setWorkoutNotes(newNotes)
    setWorkoutData((prevWorkoutData) => {
      return {
        ...prevWorkoutData,
        notes: newNotes,
      }
    })
  }

  function addExercise(exercisename) {
    const exerciseToBeAdded = { name: exercisename, sets: [] }
    const updatedExercises = [...workoutData.exercises, exerciseToBeAdded]
    setWorkoutData({ ...workoutData, exercises: updatedExercises })
  }

  return (
    <WorkoutDataContext.Provider
      value={{
        workoutData,
        setWorkoutData,
        workoutNotes,
        setWorkoutNotes,
        handleEditWorkoutNotes,
        addExercise,
        resetWorkout,
      }}
    >
      {children}
    </WorkoutDataContext.Provider>
  )
}

export default WorkoutDataContext
