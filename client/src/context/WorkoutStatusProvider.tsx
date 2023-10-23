//@ts-nocheck
import { createContext, useState } from "react"

const WorkoutStatusContext = createContext({})

export const WorkoutStatusProvider = ({ children }) => {
  const [workoutIsInProgress, setWorkoutIsInProgress] = useState(false)
  const [sessionWindowIsMinimized, setSessionWindowIsMinimized] = useState(false)

  return (
    <WorkoutStatusContext.Provider
      value={{ workoutIsInProgress, setWorkoutIsInProgress, sessionWindowIsMinimized, setSessionWindowIsMinimized }}
    >
      {children}
    </WorkoutStatusContext.Provider>
  )
}

export default WorkoutStatusContext
