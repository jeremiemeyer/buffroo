//@ts-nocheck
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import ExerciseCard from "../../exercises/ExerciseCard"

export default function AddExerciseToWorkoutModal({ onClose, addExercise }:any) {
  const [exerciseData, setExerciseData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  // const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/exercises")
        // console.log(response.data)
        setExerciseData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const filteredExercises = exerciseData.filter((ex) =>
    ex["name"].toLowerCase().includes(searchInput.toLowerCase())
  )

  function handleChange(e) {
    setSearchInput(e.target.value)
  }

  function handleClick(exercise) {
    setSelectedExercise(exercise)
    // console.log(exercise)
  }

  function handleAddExercise() {
    if (selectedExercise.length === 0) {
      return
    }
    // Ici on passe l'exercice selectionné au parent component, càd WorkoutModal
    addExercise(selectedExercise)
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-10 inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 relative bg-gray-100 text-slate-900 w-[90%] h-[90%] px-4 pb-4 rounded-2xl border border-slate-600 mb-[10vh] mt-12"
      >
        <div className="flex flex-row justify-between items-center h-[10%]">
          <Button onClick={onClose} colorScheme="red">
            X
          </Button>
          <Button onClick={handleAddExercise} colorScheme="blue">
            Add
          </Button>
          {/* <Button onClick={handleSave} colorScheme="blue">Save</Button> */}
        </div>

        <div className="p-2 relative h-[90%]">
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
            {filteredExercises.map((exercise, key) => (
              <ExerciseCard
                onClick={() => handleClick(exercise)}
                key={exercise["_id"]}
                name={exercise["name"]}
                category={exercise["category"]}
                bodypart={exercise["bodypart"]}
                isSelected={exercise["_id"] === selectedExercise["_id"]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
