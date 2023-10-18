//@ts-nocheck
import ExerciseCard from "../components/exercises/ExerciseCard"
import Title from "../components/layout/Title"
import { useState, useEffect } from "react"
import axios from "axios"
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
import AddExerciseModal from "../components/modals/AddExerciseModal"

export default function Exercises() {
  const [isLoading, setIsLoading] = useState(true)
  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
  const [exerciseData, setExerciseData] = useState([])
  const [filteredExercises, setFilteredExercises] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")

  const getExerciseList = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        "https://buffroo-87a1e6eff5dd.herokuapp.com/exercises"
      )
      setExerciseData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getExerciseList()
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
  }, [exerciseData, searchInput, selectedCategory, selectedBodyPart])

  return (
    <>
      <div>
        <div className="px-6 fixed w-full pb-4 items-center  bg-white">
          <div className="flex justify-between flex-row w-full items-center">
            <Title>Exercises</Title>
            <Button
              onClick={() => setShowNewExerciseModal(true)}
              colorScheme="blue"
            >
              Add New
            </Button>
          </div>

          <div className="pt-2 flex flex-row gap-2">
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

        <div className="pt-[110px] pb-[100px] px-6">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Box key={index} className="bg-gray-200 mt-2 w-[calc(100%-40px)] p-[20px] mx-auto rounded-xl">
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
                  name={ex["name"]}
                  category={ex["category"]}
                  bodypart={ex["bodypart"]}
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
            getExerciseList={getExerciseList}
          />,
          document.body
        )}
    </>
  )
}
