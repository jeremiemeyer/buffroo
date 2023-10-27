//@ts-nocheck
import { Button, Input, Select } from "@chakra-ui/react"
import axios from "../../api/axios"
import { useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"

export default function AddExerciseModal({ onClose, getExercises }: any) {
  const [nameInput, setNameInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const USER_EXERCISES_URL = `/api/users/${auth.userId}/exercises`

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
    const exerciseData = {
      name: nameInput,
      bodypart: selectedBodyPart,
      category: selectedCategory,
    }

    try {
      await axiosPrivate.post(USER_EXERCISES_URL, exerciseData)
      alert("New exercise added!")
      onClose()
      getExercises()
    } catch (error) {
      return console.log("error")
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-100 text-slate-900 px-6 pt-6 pb-6 rounded-2xl border border-slate-600 mb-[10vh] mx-4 xl:max-w-[1200px]"
      >
        <div className="flex flex-row justify-between items-center text-center">
          <Button onClick={onClose} colorScheme="red" fontWeight={"400"}>
            X
          </Button>
          <h1 className="font-semibold text-xl text-center">
            Create New Exercise
          </h1>
          <Button onClick={handleSave} colorScheme="blue" borderRadius="16px" fontWeight={"400"}>
            Save
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          <Input
            placeholder="Add name"
            value={nameInput}
            onChange={(e) => handleChange(e)}
          ></Input>

          <div className="grid grid-cols-2 justify-between items-center">
            <p className="font-semibold">Body part</p>
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
            <p className="font-semibold">Category</p>
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
