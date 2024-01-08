import { useContext } from "react"
import ExercisesContext from "@/context/api/ExercisesProvider"

export default function useExercises() {
  const context = useContext(ExercisesContext)
  return context
}
