//@ts-nocheck
import { useContext } from "react"
import WorkoutStopwatchContext from "@/context/WorkoutStopwatchProvider"

export default function useWorkoutStopwatch() {
  const context = useContext(WorkoutStopwatchContext)
  return context
}
