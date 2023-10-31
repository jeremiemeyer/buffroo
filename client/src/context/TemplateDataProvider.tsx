//@ts-nocheck
import { createContext, useState } from "react"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "./WorkoutStatusProvider"

const TemplateDataContext = createContext({})

export const TemplateDataProvider = ({ children }) => {
  const { auth } = useAuth()
  const [timer, setTimer] = useState({})
  const [templateData, setTemplateData] = useState({
    name: "",
    startdate: "",
    enddate: "",
    exercises: [],
    notes: "",
  })

  function resetTemplate() {
    setTemplateData({
      name: "",
      startdate: "",
      enddate: "",
      exercises: [],
      notes: "",
    })
  }

  function handleEditTemplateNotes(e) {
    const newNotes = e.target.value
    setTemplateData({ ...templateData, notes: newNotes })
  }

  function handleEditTemplateName(e) {
    const newName = e.target.value
    setTemplateData({ ...templateData, name: newName })
  }

  function addExercise(exercise) {
    const exerciseToBeAdded = {
      name: exercise.name,
      sets: [{ reps: "", weight: "", rpe: "" }],
    }
    const updatedExercises = [...templateData.exercises, exerciseToBeAdded]
    setTemplateData({ ...templateData, exercises: updatedExercises })
  }

  return (
    <TemplateDataContext.Provider
      value={{
        templateData,
        setTemplateData,
        handleEditTemplateNotes,
        handleEditTemplateName,
        addExercise,
        resetTemplate,
      }}
    >
      {children}
    </TemplateDataContext.Provider>
  )
}

export default TemplateDataContext
