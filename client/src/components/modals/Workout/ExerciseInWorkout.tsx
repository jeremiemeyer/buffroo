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

export default function ExerciseInWorkout({
  name,
  workoutData,
  setWorkoutData,
}: any) {
  const [exerciseSets, setExerciseSets] = useState([
    { reps: "", weight: "", rpe: "" },
  ])

  // ajouter série
  function handleAddSet() {
    setExerciseSets(exerciseSets.concat({ reps: "", weight: "", rpe: "" }))
    console.log(exerciseSets)
  }

  // supprimer série
  function handleRemoveSet(index: number) {
    const updatedExerciseSets = [...exerciseSets]
    updatedExerciseSets.splice(index, 1)
    setExerciseSets(updatedExerciseSets)

    const updatedData = { ...workoutData }
    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise: any) => exercise.name === name
    )

    if (exerciseIndex !== -1) {
      updatedData.exercises[exerciseIndex].sets.splice(index, 1)
      setWorkoutData(updatedData)
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
    const updatedData = { ...workoutData }
    const filteredExercises = updatedData.exercises.filter(
      (exercise) => exercise.name !== name
    )

    updatedData.exercises = filteredExercises
    setWorkoutData(updatedData)
  }

  function handleChange({ index, event, field }: any) {
    const updatedExerciseSets = [...exerciseSets]
    if (field === "weight") {
      updatedExerciseSets[index].weight = event.target.value
    } else if (field === "reps") {
      updatedExerciseSets[index].reps = event.target.value
    } else if (field === "rpe") {
      updatedExerciseSets[index].rpe = event.target.value
    }
    setExerciseSets(updatedExerciseSets)
    console.log({ name: name, sets: updatedExerciseSets })

    // Update workout data in parent component thanks to callback

    const updatedData = workoutData

    const exerciseIndex = updatedData.exercises.findIndex(
      (exercise: any) => exercise.name === name
    )

    if (exerciseIndex !== -1) {
      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
    } else {
      updatedData.exercises.push({ name: name, sets: updatedExerciseSets })
    }

    setWorkoutData({
      ...workoutData,
      exercises: updatedData.exercises,
    })
  }

  return (
    <div className="pb-8 bg-gray-200 rounded-xl p-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">{name}</p>
        <Menu variant="filled">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
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
        <div className="grid grid-cols-5 font-bold">
          <div>Set</div>
          <div>Prev.</div>
          <div>kg</div>
          <div>reps</div>
          {/* <div>RPE</div> */}
        </div>
        {exerciseSets.map((set, index) => (
          <div
            className="grid grid-cols-5 bg-gray-200 px-2 items-center"
            key={index}
          >
            <div>{index + 1}</div>
            <div>-</div>
            <Input
              variant="flushed"
              onChange={(event) =>
                handleChange({ index, event, field: "weight" })
              }
              value={set.weight}
            />

            <Input
              variant="flushed"
              onChange={(event) =>
                handleChange({ index, event, field: "reps" })
              }
              value={set.reps}
            />
            {/* <Input
              variant="filled"
              onChange={(event) => handleChange({ index, event, field: "rpe" })}
              value={set.rpe}
            /> */}
            <Button
              onClick={() => handleRemoveSet(index)}
              className="ml-auto h-2 w-2 hover:bg-gray-300"
              variant="flushed"
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
      >
        Add set
      </Button>
    </div>
  )
}
