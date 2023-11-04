//@ts-nocheck
import { Input, Select } from "@chakra-ui/react"
import { Button } from "@/components//ui/button"
import axios from "../../../api/axios"
import { useState } from "react"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import useAuth from "../../../hooks/useAuth"
import useToast from "../../../hooks/useToast"
import useExercises from "@/hooks/api/useExercises"

export default function AddExerciseModal({ onClose, getAllExercises }: any) {
  const [nameInput, setNameInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const USER_EXERCISES_URL = `/api/users/${auth.userId}/exercises`
  const { exerciseAdded, someFieldsAreMissing } = useToast()
  const { addNewUserExercise, setExercisesData, exercisesData } = useExercises()

  function handleChange(e) {
    setNameInput(e.target.value)
  }

  function handleChangeCategory(e) {
    setSelectedCategory(e.target.value)
  }

  function handleChangeBodyPart(e) {
    setSelectedBodyPart(e.target.value)
  }

  async function handleSave() {
    const userId = auth.userId

    if (!nameInput | !selectedBodyPart | !selectedCategory) {
      return someFieldsAreMissing()
    }

    const newExerciseData = {
      name: nameInput,
      bodypart: selectedBodyPart,
      category: selectedCategory,
    }

    // console.log(newExerciseData)
    const success = await addNewUserExercise({
      userId: auth.userId,
      newExerciseData: newExerciseData,
    })
    if (success) {
      onClose()
      // getAllExercises()
      exerciseAdded() // toast notification
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 text-slate-900 px-6 pt-6 pb-6 rounded-2xl border border-slate-600 mb-[10vh] mx-4 xl:max-w-[1200px]"
      >
        <div className="flex flex-row justify-between items-center text-center">
          <Button onClick={onClose} variant="destructive">
            X
          </Button>
          <h1 className="text-2xl text-center">Create New Exercise</h1>
          <Button onClick={handleSave}>Save</Button>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex flex-row items-center">
            <i className="fa fa-heading mr-4" />
            <Input
              placeholder="Exercise name"
              variant="flushed"
              value={nameInput}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>

          <div className="grid grid-cols-2 justify-between items-center">
            <p>Body part</p>
            <Select
              placeholder="Select option"
              onChange={(e) => handleChangeBodyPart(e)}
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
            <p>Category</p>
            <Select
              placeholder="Select option"
              onChange={(e) => handleChangeCategory(e)}
            >
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="machine">Machine</option>
              <option value="weighted-bodyweight">Weighted Bodyweight</option>
              <option value="assisted-bodyweight">Assisted Bodyweight</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
