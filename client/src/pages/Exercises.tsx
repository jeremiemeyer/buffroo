//@ts-nocheck
import ExerciseCard from "../components/pages/exercises/ExerciseCard"
import Title from "../components/layout/Title"
import { useState, useEffect, useRef } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import {
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
import AddExerciseModal from "../components/pages/exercises/AddExerciseModal"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import { Button } from "@/components/ui/button"
import useExercises from "@/hooks/api/useExercises"
import ExercisesList from "@/components/pages/exercises/ExercisesList"

export default function Exercises() {
  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
 
  // const [exerciseData, setExerciseData] = useState([])
  const [filteredExercises, setFilteredExercises] = useState([])

  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")
  const [selectedExerciseId, setSelectedExerciseId] = useState("")
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth()
  const { exercisesData, getAllExercises, isLoading } = useExercises()

  useEffect(() => {
    // Create a copy of the original exercisesData
    let filteredData = [...exercisesData]

    // Apply filters
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

    // Update filteredExercises with the filtered data
    setFilteredExercises(filteredData)
  }, [exercisesData, searchInput, selectedCategory, selectedBodyPart])



  function onClickExerciseEdit(exerciseId) {
    setShowExerciseEditModal(true)
  }

  function onClickExerciseStats(exerciseId) {
    setShowExerciseStatsModal(true)
  }

  return (
    <>
      {/* Title + search bar */}
      <div className="fixed top-0 left-0 w-full pb-4 items-center bg-glassmorphism2 z-[10]">
        <div className="flex px-6 justify-between flex-row items-center">
          <Title>Exercises</Title>
          <Button onClick={() => setShowNewExerciseModal(true)}>Add New</Button>
        </div>

        <div className="flex flex-col">
          <div className="px-6 pt-2">
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
          </div>

          <div className="px-6 pt-2 flex flex-row gap-2">
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
        {/* <button
          onClick={() => {
            const newExercise = {
              _id: "65467b2e0ec1822be06bda33",
              userId: "6545eb6a98c432e7721d3da6",
              name: "erdf",
              bodypart: "cardio",
              category: "weighted-bodyweight",
              __v: 0,
            }

            setFilteredExercises([...filteredExercises, newExercise])
          }}
          className="text-4xl "
        >
          change filteredexercisesData
        </button>
        // <button onClick={() => console.log(exercisesData)}>zeze</button> */}
      </div>

      {/* Content */}
      <ExercisesList exercisesData={filteredExercises} isLoading={isLoading} />

      {showNewExerciseModal &&
        createPortal(
          <AddExerciseModal
            onClose={() => setShowNewExerciseModal(false)}
            getAllExercises={getAllExercises}
          />,
          document.body
        )}


    </>
  )
}
