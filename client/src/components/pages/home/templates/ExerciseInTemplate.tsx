//@ts-nocheck
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import {
  AddIcon,
  RepeatIcon,
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import useTheme from "@/hooks/useTheme"


export default function ExerciseInTemplate({
  exercise,
  templateData,
  setTemplateData,
}: any) {
  // This exercise's index in templateData
  const exerciseIndex = templateData.exercises.findIndex(
    (ex: any) => ex.name === exercise.name
  )
  const { theme } = useTheme()
  const exerciseSets = templateData.exercises[exerciseIndex].sets

  // ajouter série
  function handleAddSet() {
    const newSet = { reps: "", weight: "", rpe: "" }
    const updatedExerciseSets = [...exerciseSets, newSet]
    templateData.exercises[exerciseIndex].sets = updatedExerciseSets
    setTemplateData({ ...templateData })
  }

  // supprimer série
  function handleRemoveSet(index: number) {
    const updatedData = { ...templateData }

    if (exerciseIndex !== -1) {
      const updatedExerciseSets = [...updatedData.exercises[exerciseIndex].sets]
      updatedExerciseSets.splice(index, 1)
      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
      setTemplateData({ ...updatedData })
    }
  }

  function moveExerciseAfter() {
    const updatedData = { ...templateData }

    if (
      exerciseIndex !== -1 &&
      exerciseIndex < updatedData.exercises.length - 1
    ) {
      const [movedExercise] = updatedData.exercises.splice(exerciseIndex, 1)
      updatedData.exercises.splice(exerciseIndex + 1, 0, movedExercise)
      setTemplateData(updatedData)
    }
  }

  function moveExerciseBefore() {
    const updatedData = { ...templateData }

    // Check if the current exercise is not the first exercise
    if (exerciseIndex > 0) {
      // Swap the current exercise with the previous exercise
      const previousExercise = updatedData.exercises[exerciseIndex - 1]
      updatedData.exercises[exerciseIndex - 1] =
        updatedData.exercises[exerciseIndex]
      updatedData.exercises[exerciseIndex] = previousExercise

      // Update the template data with the modified order of exercises
      setTemplateData({
        ...templateData,
        exercises: updatedData.exercises,
      })
    }
  }

  function removeExercise() {
    const updatedExercises = [...templateData.exercises]
    updatedExercises.splice(exerciseIndex, 1)

    setTemplateData({ ...templateData, exercises: updatedExercises })
  }

  function handleChange({ index, event, field }: any) {
    const updatedData = { ...templateData }

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
      setTemplateData({ ...updatedData })
    } else {
      // If the exercise doesn't exist in the templateData, create a new exercise
      const newExercise = { name, sets: [] }
      if (field === "weight") {
        newExercise.sets[index].weight = event.target.value
      } else if (field === "reps") {
        newExercise.sets[index].reps = event.target.value
      } else if (field === "rpe") {
        newExercise.sets[index].rpe = event.target.value
      }

      updatedData.exercises.push(newExercise)
      setTemplateData({ ...updatedData })
    }
  }

  return (
    <div className="pb-8 bg-white dark:text-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex flex-row justify-between">
        <p className="text-2xl dark:text-white dark:text-opacity-90">{exercise.name}</p>
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
        {/* <button>
          <i className="fa fa-ellipsis"></i>
        </button> */}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-8 font-semibold dark:text-white dark:text-opacity-80">
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
              className="grid grid-cols-5 bg-white dark:bg-gray-800  px-2 items-center gap-8 dark:text-white dark:text-opacity-90"
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
                borderColor={theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                color={theme === "dark" ? "white" : ""}
              />

              <Input
                type="number"
                variant="flushed"
                onChange={(event) =>
                  handleChange({ index, event, field: "reps" })
                }
                value={set.reps}
                textAlign={"center"}
                borderColor={theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                color={theme === "dark" ? "white" : ""}
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

      <Button
        onClick={handleAddSet}
      >
        Add set
      </Button>
    </div>
  )
}
