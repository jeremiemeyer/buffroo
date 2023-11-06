//@ts-nocheck
import { useContext } from "react"
import WorkoutDataContext from "@/context/WorkoutDataProvider"

export default function useWorkoutData() {
  const context = useContext(WorkoutDataContext)
  return context
}
