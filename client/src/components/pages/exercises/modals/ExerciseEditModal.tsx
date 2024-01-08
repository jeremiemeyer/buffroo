//@ts-nocheck
import { useState, useEffect } from "react"
import useToast from "@/hooks/useToast"
import useExercises from "@/hooks/api/useExercises"
import useTheme from "@/hooks/useTheme"
import { Button } from "@/components/ui/button"
import { Input, Select } from "@chakra-ui/react"
import ModalTemplate from "@/components/ModalTemplate"

export default function ExerciseEditModal({
  exerciseData,
  selectedExerciseId,
  onClose,
}) {
  const [thisExerciseData, setThisExerciseData] = useState(exerciseData)
  const { exerciseUpdated } = useToast()
  const { exercisesData, editUserExercise } = useExercises()
  const { theme } = useTheme()

  useEffect(() => {
    console.log("exercises updated")
  }, [exercisesData])

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
    <ModalTemplate onClose={onClose}>
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
    </ModalTemplate>
  )
}
