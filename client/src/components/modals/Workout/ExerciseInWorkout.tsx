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
    <div className="pb-8">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">{name}</p>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
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
        <div className="grid grid-cols-6 font-bold">
          <div>Set</div>
          <div>Previous</div>
          <div>kg</div>
          <div>reps</div>
          <div>RPE</div>
        </div>
        {exerciseSets.map((set, index) => (
          <div className="grid grid-cols-6" key={index}>
            <div>{index + 1}</div>
            <div>-</div>
            <Input
              variant="filled"
              onChange={(event) =>
                handleChange({ index, event, field: "weight" })
              }
              value={set.weight}
            />

            <Input
              variant="filled"
              onChange={(event) =>
                handleChange({ index, event, field: "reps" })
              }
              value={set.reps}
            />
            <Input
              variant="filled"
              onChange={(event) => handleChange({ index, event, field: "rpe" })}
              value={set.rpe}
            />
            <Button
              onClick={() => handleRemoveSet(index)}
              className="ml-auto h-2 w-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleAddSet} colorScheme="blue" variant="outline">
        Add set
      </Button>
    </div>
  )
}
