//@ts-nocheck
import { useContext } from "react"
import WorkoutTimerContext from "@/context/WorkoutTimerProvider"

export default function useWorkoutTimer() {
  const context = useContext(WorkoutTimerContext)
  return context
}