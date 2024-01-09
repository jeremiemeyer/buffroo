//@ts-nocheck
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

import AddExerciseModal from "@/components/pages/exercises/modals/AddExerciseModal"
import { Button } from "@/components/ui/button"
import ExercisesList from "@/components/pages/exercises/ExercisesList"

import useExercises from "@/hooks/api/useExercises"

import { Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export default function Exercises() {
  const { exercisesData, isLoading, getAllExercises } = useExercises()

  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
  const [filteredExercises, setFilteredExercises] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")

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

  const bodypart_options = [
    { value: "core", name: "Core" },
    { value: "arms", name: "Arms" },
    { value: "back", name: "Back" },
    { value: "chest", name: "Chest" },
    { value: "legs", name: "Legs" },
    { value: "shoulders", name: "Shoulders" },
    { value: "cardio", name: "Cardio" },
    { value: "other", name: "Other" },
  ]

  const category_options = [
    { value: "barbell", name: "Barbell" },
    { value: "dumbbell", name: "Dumbbell" },
    { value: "machine", name: "Machine" },
    { value: "weighted-bodyweight", name: "Weighted Bodyweight" },
    { value: "assisted-bodyweight", name: "Assisted Bodyweight" },
  ]

  return (
    <>
      {/* Search bar */}
      <div className="sticky top-[55px] bg-white/80 dark:bg-black/60 bg-glassmorphism2 w-full py-6 items-center  z-[10] dark:border-gray-800 w-full">
        <div className="flex flex-col max-w-[1000px] mx-auto">
          <div className="px-6 pt-2 flex flex-row gap-2">
            <InputGroup color={"white"}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="text-black dark:text-white dark:bg-gray-600 dark:border-gray-600"
              />
            </InputGroup>
            <Button onClick={() => setShowNewExerciseModal(true)}>
              Add New
            </Button>
          </div>

          <div className="px-6 pt-2 flex flex-row gap-2">
            <Select
              placeholder="Any body part"
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              className=" dark:bg-gray-600 dark:border-gray-600"
            >
              {bodypart_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Any category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className=" dark:bg-gray-600 dark:border-gray-600"
            >
              {category_options.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <ExercisesList
        exercisesData={filteredExercises}
        isLoading={isLoading}
        getAllExercises={getAllExercises}
      />

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
