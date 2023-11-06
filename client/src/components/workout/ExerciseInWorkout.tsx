// @ts-nocheck
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"

export default function ExerciseInWorkout({
  workoutData,
  setWorkoutData,
  exercise,
}: any) {

  // This exercise's index in workoutData
  const exerciseIndex = workoutData.exercises.findIndex(
    (ex: any) => ex.name === exercise.name
  )

  const exerciseSets = workoutData.exercises[exerciseIndex].sets

  // ajouter série
  function handleAddSet() {
    const newSet = { reps: "", weight: "", rpe: "" }
    const updatedExerciseSets = [...exerciseSets, newSet]
    workoutData.exercises[exerciseIndex].sets = updatedExerciseSets
    setWorkoutData({ ...workoutData })
  }

  // supprimer série
  function handleRemoveSet(index: number) {
    const updatedData = { ...workoutData }

    if (exerciseIndex !== -1) {
      const updatedExerciseSets = [...updatedData.exercises[exerciseIndex].sets]
      updatedExerciseSets.splice(index, 1)
      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
      setWorkoutData({ ...updatedData })
    }
  }

  function moveExerciseAfter() {
    const updatedData = { ...workoutData }

    if (
      exerciseIndex !== -1 &&
      exerciseIndex < updatedData.exercises.length - 1
    ) {
      const [movedExercise] = updatedData.exercises.splice(exerciseIndex, 1)
      updatedData.exercises.splice(exerciseIndex + 1, 0, movedExercise)
      setWorkoutData(updatedData)
    }
  }

  function moveExerciseBefore() {
    const updatedData = { ...workoutData }

    // Check if the current exercise is not the first exercise
    if (exerciseIndex > 0) {
      // Swap the current exercise with the previous exercise
      const previousExercise = updatedData.exercises[exerciseIndex - 1]
      updatedData.exercises[exerciseIndex - 1] =
        updatedData.exercises[exerciseIndex]
      updatedData.exercises[exerciseIndex] = previousExercise

      // Update the workout data with the modified order of exercises
      setWorkoutData({
        ...workoutData,
        exercises: updatedData.exercises,
      })
    }
  }

  function removeExercise() {
    const updatedExercises = [...workoutData.exercises]
    updatedExercises.splice(exerciseIndex, 1)

    setWorkoutData({ ...workoutData, exercises: updatedExercises })
  }

  function handleChange({ index, event, field }: any) {
    const updatedData = { ...workoutData }

    if (exerciseIndex !== -1) {
      const updatedExerciseSets = [...updatedData.exercises[exerciseIndex].sets]

      if (field === "weight") {
        updatedExerciseSets[index].weight = event.target.value
      } else if (field === "reps") {
        updatedExerciseSets[index].reps = event.target.value
      } else if (field === "rpe") {
        updatedExerciseSets[index].rpe = event.target.value
      }

      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
      setWorkoutData({ ...updatedData })
    } else {
      // If the exercise doesn't exist in the workoutData, create a new exercise
      const newExercise = { name, sets: [] }
      if (field === "weight") {
        newExercise.sets[index].weight = event.target.value
      } else if (field === "reps") {
        newExercise.sets[index].reps = event.target.value
      } else if (field === "rpe") {
        newExercise.sets[index].rpe = event.target.value
      }

      updatedData.exercises.push(newExercise)
      setWorkoutData({ ...updatedData })
    }
  }

  return (
    <div className="pb-8 bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-row justify-between">
        <p className="text-2xl">{exercise.name}</p>
        <Menu variant="filled">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={FaEllipsisH} />}
            textColor="rgba(14,165,233,1)" //sky-500
            bg={"rgba(186,230,253,0.4)"}
            _hover={{ bg: "rgba(186,230,253,0.8)"}}
          />
          <MenuList>
            <MenuItem
              icon={<AddIcon />}
              // command="⌘T"
            >
              Add a Note
            </MenuItem>
            <MenuItem
              icon={<RepeatIcon />}
              // command="⌘N"
            >
              Replace Exercise
            </MenuItem>
            <MenuItem
              onClick={moveExerciseBefore}
              icon={<ArrowUpIcon />}
              // command="⌘N"
            >
              Move Before
            </MenuItem>
            <MenuItem
              onClick={moveExerciseAfter}
              icon={<ArrowDownIcon />}
              // command="⌘N"
            >
              Move After
            </MenuItem>
            <MenuItem
              onClick={() => removeExercise()} // Pass the index to removeExercise
              icon={<DeleteIcon />}
            >
              Remove Exercise
            </MenuItem>
          </MenuList>
        </Menu>

      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-8 font-semibold">
          <div>Set</div>
          <div>Prev.</div>
          <div>kg</div>
          <div>reps</div>
          {/* <div>RPE</div> */}
        </div>
        {exerciseSets &&
          exerciseSets.length > 0 &&
          exerciseSets.map((set, index) => (
            <div
              className="grid grid-cols-5 bg-white px-2 items-center gap-8"
              key={index}
            >
              <div>{index + 1}</div>
              <div>-</div>
              <Input
                type="number"
                variant="flushed"
                onChange={(event) =>
                  handleChange({ index, event, field: "weight" })
                }
                value={set.weight}
                textAlign={"center"}
                borderColor={"rgba(0,0,0,0.2)"}
              />

              <Input
                type="number"
                variant="flushed"
                onChange={(event) =>
                  handleChange({ index, event, field: "reps" })
                }
                value={set.reps}
                textAlign={"center"}
                borderColor={"rgba(0,0,0,0.2)"}
              />

              <Button
                onClick={() => handleRemoveSet(index)}
                className="ml-auto"
                variant="outline"
              >
                <i className="fa fa-trash "></i>
              </Button>
            </div>
          ))}
      </div>
      
      <Button onClick={handleAddSet}>Add set</Button>
      {/* <button onClick={() => console.log(exercise)}>exercise</button> */}
      {/* <button onClick={() => console.log(exerciseSets)}>sets</button>
      <button onClick={() => console.log(workoutData.exercises)}>
        workoutData
      </button> */}
    </div>
  )
}
