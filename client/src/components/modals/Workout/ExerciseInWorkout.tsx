// @ts-ignore
import { useState } from "react"
import { Button, Input } from "@chakra-ui/react"

export default function ExerciseInWorkout({
  name,
  workoutData,
  setWorkoutData,
}:any) {
  const [exerciseSets, setExerciseSets] = useState([
    { reps: "", weight: "", rpe: "" },
  ])

  // ajouter série
  function handleAddSet() {
    setExerciseSets(exerciseSets.concat({ reps: "", weight: "", rpe: "" }))
    console.log(exerciseSets)
  }

  // supprimer série
  function handleRemoveSet(index:any) {
    const updatedExerciseSets = [...exerciseSets]
    updatedExerciseSets.splice(index, 1) // Remove the set at the specified index
    setExerciseSets(updatedExerciseSets)

    setWorkoutData((prevData:any) => {
      const updatedData = [...prevData]
      const exerciseIndex = updatedData.findIndex(
        (exercise) => exercise.name === name
      )

      if (exerciseIndex !== -1) {
        updatedData[exerciseIndex].sets.splice(index, 1)
      }

      return updatedData
    })
  }

  function handleChange({index, event, field}:any) {
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
      (exercise:any) => exercise.name === name
    )

    if (exerciseIndex !== -1) {
      updatedData.exercises[exerciseIndex].sets = updatedExerciseSets
    } else {
      updatedData.exercises.push({ name: name, sets: updatedExerciseSets })
    }

    setWorkoutData({
      ...workoutData,
      exercises: updatedData.exercises
    })
  }

  return (
    <div className="pb-8">
      <p className="text-xl font-semibold">{name}</p>
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
              onChange={(event) => handleChange({ index, event, field: "weight" })}
              value={set.weight}
            />

            <Input
              variant="filled"
              onChange={(event) => handleChange({ index, event, field: "reps" })}
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
