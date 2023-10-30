//@ts-nocheck
import { useContext } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"

export default function useWorkoutStatus() {
  const context = useContext(WorkoutStatusContext)
  return context
}
