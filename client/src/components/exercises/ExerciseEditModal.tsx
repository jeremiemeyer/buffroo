//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import {
  Button,
  Input,
  Select,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import useAuth from "../../hooks/useAuth"

export default function ExerciseEditModal({
  onClose,
  selectedExerciseId,
  getExercises,
}) {
  const [exerciseData, setExerciseData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()

  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const EXERCISE_UPDATE_URL = `/api/users/${auth.userId}/exercises/${selectedExerciseId}`

  const getExerciseData = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(EXERCISE_DATA_URL)
      const exerciseData = response.data
      console.log(exerciseData)
      setExerciseData(exerciseData)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  const editUserExercise = async () => {
    try {
      console.log(EXERCISE_UPDATE_URL)
      const response = await axiosPrivate.patch(EXERCISE_UPDATE_URL, {
        exerciseData: exerciseData,
      })
      const updatedExercise = response.data
      console.log(updatedExercise)
      getExercises()
      onClose()
      alert("Exercise updated!")
    } catch (error) {
      console.error("Error updating user exercise:", error)
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  useEffect(() => {
    getExerciseData({ selectedExerciseId })
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setExerciseData({
      ...exerciseData,
      [name]: value,
    })
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[800] inset-0 bg-slate-700/75 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-100 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
      >
        <div className="flex flex-row justify-between items-center text-center">
          <Button onClick={onClose} colorScheme="red" fontWeight={"400"}>
            X
          </Button>
          <h1 className="text-3xl text-center px-5">{exerciseData["name"]}</h1>
          <Button
            onClick={editUserExercise}
            colorScheme="blue"
            borderRadius="16px"
            fontWeight={"400"}
          >
            Save
          </Button>
        </div>
        {!isLoading && (
          <div className="space-y-2 mt-4">
            <div className="flex flex-row items-center">
              <i className="fa fa-heading mr-4" />

              <Input
                placeholder="Exercise name"
                variant="flushed"
                value={exerciseData.name}
                name="name"
                onChange={(e) => handleChange(e)}
              ></Input>
            </div>

            <div className="grid grid-cols-2 justify-between items-center">
              <p>Body part</p>
              <Select
                placeholder="Select option"
                onChange={(e) => handleChange(e)}
                value={exerciseData.bodypart}
                name="bodypart"
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
                onChange={(e) => handleChange(e)}
                name="category"
                value={exerciseData.category}
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
