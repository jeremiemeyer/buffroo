// @ts-nocheck
import { useState } from "react"
import {
  Button,
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
  name,
  workoutData,
  setWorkoutData,
}: any) {
  // This exercise's index in workoutData
  const exerciseIndex = workoutData.exercises.findIndex(
    (exercise: any) => exercise.name === name
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

    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise: any) => exercise.name === name
    )

    if (exerciseIndex !== -1) {
      const updatedExerciseSets = [...updatedData.exercises[exerciseIndex].sets]
      updatedExerciseSets.splice(index, 1)
      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
      setWorkoutData({ ...updatedData })
    }
  }

  function moveExerciseAfter() {
    const updatedData = { ...workoutData }
    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise: any) => exercise.name === name
    )

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

    // Find the index of the current exercise
    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise) => exercise.name === name
    )

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

    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise: any) => exercise.name === name
    )

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
    <div className="pb-8 bg-gray-200 rounded-xl p-4">
      <div className="flex flex-row justify-between">
        <p className="text-2xl">{name}</p>
        <Menu variant="filled">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={FaEllipsisH} />}
            variant="filled"
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
        {/* <button>
          <i className="fa fa-ellipsis"></i>
        </button> */}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-8">
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
              className="grid grid-cols-5 bg-gray-200 px-2 items-center gap-8"
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
                padding={"12px"}
                bgColor={"rgb(243 244 246)"}
              />

              <Input
                type="number"
                variant="flushed"
                onChange={(event) =>
                  handleChange({ index, event, field: "reps" })
                }
                value={set.reps}
                padding={"12px"}
                bgColor={"rgb(243 244 246)"}
              />

              <Button
                onClick={() => handleRemoveSet(index)}
                className="ml-auto h-2 w-2 hover:bg-gray-300"
                variant="flushed"
                fontWeight={"400"}
              >
                <i className="fa fa-trash "></i>
              </Button>
            </div>
          ))}
      </div>

      <Button
        onClick={handleAddSet}
        className="mt-4"
        colorScheme="blue"
        variant="outline"
        borderRadius="16px"
        fontWeight={"400"}
      >
        Add set
      </Button>
      {/* <button onClick={() => console.log(exerciseSets)}>sets</button>
      <button onClick={() => console.log(workoutData.exercises)}>
        workoutData
      </button> */}
    </div>
  )
}
