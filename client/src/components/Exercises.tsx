//@ts-nocheck
import ExerciseCard from "./exercises/ExerciseCard"
import Title from "./layout/Title"
import { useState, useEffect, useRef } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { createPortal } from "react-dom"
import AddExerciseModal from "./exercises/AddExerciseModal"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import ExerciseDetailsModal from "./exercises/ExerciseDetailsModal"

export default function Exercises() {
  const [isLoading, setIsLoading] = useState(true)
  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
  const [showExerciseDetailsModal, setShowExerciseDetailsModal] = useState(false)
  const [exerciseData, setExerciseData] = useState([])
  const [filteredExercises, setFilteredExercises] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")
  const [selectedExerciseId, setSelectedExerciseId] = useState("")
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth()
  // const controller = new AbortController()
  // let isMounted = true
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

  useEffect(() => {
    let filteredData = exerciseData

    if (searchInput) {
      filteredData = filteredData.filter((ex) =>
        ex["name"].toLowerCase().includes(searchInput.toLowerCase())
      )
    }

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (ex) => ex["category"].toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (selectedBodyPart) {
      filteredData = filteredData.filter(
        (ex) => ex["bodypart"].toLowerCase() === selectedBodyPart.toLowerCase()
      )
    }

    setFilteredExercises(filteredData)

    // return () => {
    //   isMounted = false // Unmounting, set isMounted to false
    // }
  }, [exerciseData, searchInput, selectedCategory, selectedBodyPart])



  // No overflow when modal is open
  useEffect(() => {
    if (showNewExerciseModal || showExerciseDetailsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNewExerciseModal, showExerciseDetailsModal]);
  function onClickExerciseCard(exerciseId){
    setSelectedExerciseId(exerciseId)
    setShowExerciseDetailsModal(true)
  }


  return (
    <>
      <div>
        <div className="fixed top-0 left-0 z-[500] w-full pb-4 items-center  bg-glassmorphism2 z-[10]">
          <div className="flex px-6  justify-between flex-row w-full items-center">
            <Title>Exercises</Title>
            <Button
              onClick={() => setShowNewExerciseModal(true)}
              colorScheme="blue"
            >
              Add New
            </Button>
          </div>

          <div className="px-6 pt-2 flex flex-row gap-2">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>
            <Select
              placeholder="Any body part"
              onChange={(e) => setSelectedBodyPart(e.target.value)}
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
            <Select
              placeholder="Any category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="machine">Machine</option>
              <option value="weighted-bodyweight">Weighted Bodyweight</option>
              <option value="assisted-bodyweight">Assisted Bodyweight</option>
            </Select>
          </div>
        </div>

        <div className="pt-[130px] pb-[80px] z-[0]">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Box
                key={index}
                className="bg-gray-200 mt-2 w-[calc(100%-40px)] p-[20px] mx-auto rounded-xl"
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
              {filteredExercises.map((ex, key) => (
                <ExerciseCard
                  key={key}
                  exerciseId={ex["_id"]}
                  name={ex["name"]}
                  category={ex["category"]}
                  bodypart={ex["bodypart"]}
                  onClickExerciseCard={onClickExerciseCard}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {showNewExerciseModal &&
        createPortal(
          <AddExerciseModal
            onClose={() => setShowNewExerciseModal(false)}
            getExercises={getExercises}
          />,
          document.body
        )}

      {showExerciseDetailsModal && 
        createPortal(
          <ExerciseDetailsModal
            onClose={() => setShowExerciseDetailsModal(false)}
            selectedExerciseId={selectedExerciseId}
          />,
          document.body
        )}
    </>
  )
}
