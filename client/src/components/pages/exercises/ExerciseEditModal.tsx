//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { Button } from "@/components/ui/button"
import {
  Input,
  Select,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import useAuth from "../../../hooks/useAuth"
import useToast from "@/hooks/useToast"
import useExercises from "@/hooks/api/useExercises"
import useTheme from "@/hooks/useTheme"

export default function ExerciseEditModal({
  exerciseData,
  selectedExerciseId,
  onClose,
  getAllExercises,
}) {
  const [thisExerciseData, setThisExerciseData] = useState(exerciseData)
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const { exerciseUpdated } = useToast()
  const { exercisesData, editUserExercise } = useExercises()
  const { theme } = useTheme()

  useEffect(() => {
    console.log("exercises updated")
  }, [exercisesData])

  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const EXERCISE_UPDATE_URL = `/api/users/${auth.userId}/exercises/${selectedExerciseId}`

  function handleChange(e) {
    const { name, value } = e.target
    setThisExerciseData({
      ...thisExerciseData,
      [name]: value,
    })
  }

  async function handleSaveChanges() {
    console.log(selectedExerciseId)
    const success = await editUserExercise({
      userId: auth.userId,
      exerciseToEditId: selectedExerciseId,
      updatedExerciseData: thisExerciseData,
    })
    if (success) {
      // getAllExercises() -- of course I can force the list to update by calling this function here, which will fetch all the exercises again, but I would like to understand why my "ExercisesList" component does not automatically update, considering it's using the "exercisesData" from the custom hook, and that this value is supposed to change when using "addNewUserExercise"
      onClose()
      exerciseUpdated() // toast
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[800] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
      >
        <div className="flex flex-row justify-between items-center text-center">
          <Button onClick={onClose} variant="destructive">
            X
          </Button>
          <h1 className="text-3xl text-center px-5 dark:text-white dark:text-opacity-90">
            {thisExerciseData["name"]}
          </h1>
          <Button onClick={handleSaveChanges}>Save</Button>
        </div>
        {/* <button onClick={() => console.log(thisExerciseData)}>consolelog</button> */}
        {thisExerciseData !== null && (
          <div className="space-y-2 mt-4">
            <div className="flex flex-row items-center">
              <i className="fa fa-heading mr-4 dark:text-white dark:text-opacity-90" />

              <Input
                placeholder="Exercise name"
                variant="flushed"
                value={thisExerciseData.name}
                name="name"
                onChange={(e) => handleChange(e)}
                color={theme === "dark" ? "white" : ""}
              ></Input>
            </div>

            <div className="grid grid-cols-2 justify-between items-center">
              <p className="dark:text-white dark:text-opacity-90">Body part</p>
              <Select
                placeholder="Select option"
                onChange={(e) => handleChange(e)}
                value={thisExerciseData.bodypart}
                name="bodypart"
                className=" dark:bg-gray-600 dark:border-gray-600"
                color={theme === "dark" ? "white" : ""}
                sx={
                  theme === "dark"
                    ? {
                        "> option": {
                          background: "black",
                          color: "white",
                        },
                      }
                    : ""
                }
              >
                <option value="core">Core</option>
                <option value="arms">Arms</option>
                <option value="back">Back</option>
                <option value="chest">Chest</option>
                <option value="legs">Legs</option>
                <option value="shoulders">Shoulders</option>
                <option value="cardio">Cardio</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 justify-between items-center">
              <p className="dark:text-white dark:text-opacity-90">Category</p>
              <Select
                placeholder="Select option"
                onChange={(e) => handleChange(e)}
                name="category"
                value={thisExerciseData.category}
                className=" dark:bg-gray-600 dark:border-gray-600"
                color={theme === "dark" ? "white" : ""}
                sx={
                  theme === "dark"
                    ? {
                        "> option": {
                          background: "black",
                          color: "white",
                        },
                      }
                    : ""
                }
              >
                <option value="barbell">Barbell</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="machine">Machine</option>
                <option value="weighted-bodyweight">Weighted Bodyweight</option>
                <option value="assisted-bodyweight">Assisted Bodyweight</option>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
