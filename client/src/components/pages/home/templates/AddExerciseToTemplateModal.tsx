//@ts-nocheck
import axios from "@/api/axios"
import { useState, useEffect } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import ExerciseCard from "@/components/pages/exercises/ExerciseCard"
import { Button } from "@/components/ui/button"
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useLocation, useNavigate } from "react-router-dom"
import TemplateExercisesListExerciseCard from "./TemplateExercisesListExerciseCard"
import useTemplateData from "@/hooks/useTemplateData"
import useTheme from "@/hooks/useTheme"


export default function AddExerciseToTemplateModal({
  onClose,
  templateData,
  setTemplateData,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  // const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const DEFAULT_EXERCISES_URL = "/api/exercises"
  const USER_EXERCISES_URL = `/api/users/${auth.userId}/exercises`
  const { theme } = useTheme()

  const getExercises = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(DEFAULT_EXERCISES_URL)
      const defaultExercises = response.data

      const userResponse = await axiosPrivate.get(USER_EXERCISES_URL)
      const userExercises = userResponse.data

      setExerciseData([...defaultExercises, ...userExercises])
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      navigate("/login", { state: { from: location }, replace: true })
    }
  }

  useEffect(() => {
    getExercises()
  }, [])

  const filteredExercises = exerciseData.filter((ex) =>
    ex["name"].toLowerCase().includes(searchInput.toLowerCase())
  )

  function handleChange(e) {
    setSearchInput(e.target.value)
  }

  function handleSelectExercise(exercise) {
    setSelectedExercise(exercise)
    // console.log(exercise)
  }

  function handleAddExercise(exercise) {
    const exerciseToBeAdded = {
      name: exercise.name,
      sets: [{ reps: "", weight: "", rpe: "" }],
      exerciseId: exercise._id,
    }
    const updatedExercises = [...templateData.exercises, exerciseToBeAdded]
    setTemplateData({ ...templateData, exercises: updatedExercises })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative w-full m-2 md:max-w-[600px] bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 md:min-w-[600px] h-[90%] px-4 pb-4 rounded-2xl border border-slate-600 mb-[10vh] mt-12"
      >
        <div className="flex flex-row justify-between items-center h-[10%]">
          <Button onClick={onClose} variant="destructive">
            X
          </Button>
          <Button onClick={() => handleAddExercise(selectedExercise)}>
            Add
          </Button>
          {/* <Button onClick={handleSave} colorScheme="blue">Save</Button> */}
        </div>

        <div className="relative h-[90%]">
          <div className="h-[10%]">
          <InputGroup className={theme === "dark" ? "" : "bg-white"}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={searchInput}
                onChange={(e) => handleChange(e)}
                className=" bg-white dark:bg-gray-600 dark:border-gray-600"
                color={theme === "dark" ? "white" : ""}
              />
            </InputGroup>
          </div>

          <div className="h-[90%] overflow-auto">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <Box
                  key={index}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700  mt-2 p-[20px] mx-auto rounded-xl"
                >
                  <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ))
            ) : (
              <>
                {filteredExercises.map((exercise, index) => (
                  <TemplateExercisesListExerciseCard
                    onClick={() => handleSelectExercise(exercise)}
                    key={index}
                    exercise={exercise}
                    isSelected={exercise["_id"] === selectedExercise["_id"]}
                    templateData={templateData}
                    setTemplateData={setTemplateData}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
