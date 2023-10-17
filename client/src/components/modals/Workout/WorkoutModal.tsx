import { Button, Input } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import { useState } from "react"
import AddExerciseToWorkoutModal from "./AddExerciseToWorkoutModal"
import ExerciseInWorkout from "./ExerciseInWorkout"
import axios from "axios"

export default function WorkoutModal({ onClose }: any) {
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [workoutExercises, setWorkoutExercises] = useState<any[]>([])
  const [workoutData, setWorkoutData] = useState({
    exercises: [],
    notes: "",
  })
  const [workoutNotes, setWorkoutNotes] = useState("")

  function handleEditWorkoutNotes(e: any) {
    const newNotes = e.target.value
    setWorkoutNotes(newNotes)
    setWorkoutData((prevWorkoutData) => {
      return {
        ...prevWorkoutData,
        notes: newNotes,
      }
    })
  }
  async function handleSave() {
    try {
      await axios.post(`http://localhost:3000/sessions`, workoutData)
      alert("New session added!")
    } catch (error) {
      return console.log("error")
    }
    onClose()
  }

  function addExercise(exercise: any) {
    setWorkoutExercises(workoutExercises.concat(exercise))
  }

  return (
    <>
      <div
        // onClick={onClose}
        className="fixed z-10 inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
      >
        <div
          // onClick={(e) => e.stopPropagation()}
          className="z-20 relative bg-gray-100 text-slate-900 min-w-[400px] md:min-w-[1200px] w-[100%] h-[95%]  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="h-[5%] flex flex-row justify-between items-center">
            <h1 className="font-semibold text-xl">Workout</h1>
            <Button onClick={handleSave} colorScheme="green">
              Finish
            </Button>
          </div>

          <div className="h-[80%] mt-6 overflow-auto">
            <div className="space-y-2 mt-4">
              <Input
                placeholder="Notes"
                value={workoutNotes}
                onChange={(e) => handleEditWorkoutNotes(e)}
              ></Input>

              {/* Liste des exos */}
              <div className="h-1/2 overflow-auto ">
                {workoutExercises.map((exercise, key) => (
                  <ExerciseInWorkout
                    key={key}
                    name={exercise.name}
                    workoutData={workoutData}
                    setWorkoutData={setWorkoutData}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-[5%] py-12 space-x-4 max-w-xs mx-auto">
            <Button
              onClick={() => setShowAddExerciseModal(true)}
              colorScheme="blue"
            >
              Add Exercises
            </Button>
            <Button colorScheme="red">Cancel workout</Button>
          </div>
          <button onClick={() => console.log(workoutData)}>get workout</button>
        </div>
      </div>
      {showAddExerciseModal &&
        createPortal(
          <AddExerciseToWorkoutModal
            onClose={() => setShowAddExerciseModal(false)}
            addExercise={addExercise}
          />,
          document.body
        )}
    </>
  )
}
