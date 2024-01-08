//@ts-nocheck
import { createContext } from "react"
import toast from "react-hot-toast"

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const workoutAdded = () => toast.success("Workout added!")
  const exerciseAdded = () => toast.success("Exercise added!")
  const exerciseAddedToWorkout = () => toast.success("Exercise added!")
  const exerciseAddedToTemplate = () => toast.success("Exercise added!")
  const templateAdded = () => toast.success("Template added!")
  const preferencesSaved = () => toast.success("Preferences saved!")
  const exerciseUpdated = () => toast.success("Exercise updated!")
  const workoutUpdated = () => toast.success("Workout updated!")
  const templateUpdated = () => toast.success("Template updated!")

  const noEditDefaultExercises = () =>
    toast.error("You can't edit default exercises.")
  const workoutAlreadyInProgress = () =>
    toast.error("A workout is already in progress!")
  const cannotLogOutWorkoutInProgress = () =>
    toast.error("A workout is in progress. You cannot logout now!")
  const cannotSubmitEmptyTemplate = () =>
    toast.error("You cannot submit an empty template!")
  const cannotSubmitEmptyWorkout = () =>
    toast.error("You cannot submit an empty workout!")
  const someFieldsAreMissing = () =>
    toast.error("Please fill out all the fields.")

  const workoutDeleted = () => toast("Workout deleted!")
  const templateDeleted = () => toast("Template deleted!")
  const timesUp = () => toast("Time's up!")

  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // )

  return (
    <ToastContext.Provider
      value={{
        workoutAdded,
        exerciseAdded,
        exerciseAddedToWorkout,
        exerciseAddedToTemplate,
        templateAdded,
        preferencesSaved,
        exerciseUpdated,
        workoutUpdated,
        templateUpdated,
        noEditDefaultExercises,
        workoutAlreadyInProgress,
        cannotLogOutWorkoutInProgress,
        cannotSubmitEmptyTemplate,
        cannotSubmitEmptyWorkout,
        someFieldsAreMissing,
        workoutDeleted,
        templateDeleted,
        timesUp,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext
