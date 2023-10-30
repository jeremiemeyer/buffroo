//@ts-nocheck
import { createContext, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const workoutAdded = () => toast.success("Workout added!")
  const exerciseAdded = () => toast.success("Exercise added!")
  const templateAdded = () => toast.success("Template added!")
  const workoutDeleted = () => toast("Workout deleted!")
  const templateDeleted = () => toast("Template deleted!")

  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // )

  return (
    <ToastContext.Provider
      value={{ workoutAdded, exerciseAdded, templateAdded, templateDeleted, workoutDeleted }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext
