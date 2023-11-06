//@ts-nocheck
import axios from "../../api/axios"
import { useState, useEffect } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import ExerciseCard from "../pages/exercises/ExerciseCard"
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
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation, useNavigate } from "react-router-dom"
import WorkoutExercisesListExerciseCard from "./WorkoutExercisesListExerciseCard"
import useToast from "@/hooks/useToast"

export default function AddExerciseToWorkoutModal({
  onClose,
  addExercise,
}: any) {
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
    console.log(exercise)
  }

  function handleAddExercise() {
    if (selectedExercise.length === 0) {
      return
    }
    // Ici on passe l'Id de l'exercice selectionné au parent component, càd WorkoutModal (ou EditWorkoutModal)
    addExercise(selectedExercise)
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] w-full md:max-w-[600px] m-2 relative bg-gray-50 text-slate-900 md:min-w-[600px] h-[90%] px-4 pb-4 rounded-2xl border border-slate-600 mb-[10vh] mt-12"
      >
        <div className="flex flex-row justify-between items-center h-[10%]">
          <Button onClick={onClose} variant="destructive">
            X
          </Button>
          <Button onClick={handleAddExercise}>Add</Button>
          {/* <Button onClick={handleSave} colorScheme="blue">Save</Button> */}
        </div>

        <div className="relative h-[90%]">
          <div className="h-[10%]">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={searchInput}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </div>

          <div className="h-[90%] overflow-auto">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <Box
                  key={index}
                  className="bg-white mt-2 w-[calc(100%-40px)] p-[20px] mx-auto rounded-xl"
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
                  <WorkoutExercisesListExerciseCard
                    onClick={() => handleSelectExercise(exercise)}
                    key={index}
                    exercise={exercise}
                    isSelected={exercise["_id"] === selectedExercise["_id"]}
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
