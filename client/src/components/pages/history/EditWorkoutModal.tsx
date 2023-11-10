//@ts-nocheck
import { useState, useEffect } from "react"
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import { createPortal } from "react-dom"
import ConfirmDiscardChangesModal from "./ConfirmDiscardChangesModal"
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import ExerciseInWorkout from "../../workout/ExerciseInWorkout"
import AddExerciseToWorkoutModal from "../../workout/AddExerciseToWorkoutModal"
import useToast from "@/hooks/useToast"
import useWorkoutData from "@/hooks/useWorkoutData"
import useSessions from "@/hooks/api/useSessions"
import useTheme from "@/hooks/useTheme"

export default function EditWorkoutModal({ onClose, thisWorkoutData }) {
  const [showConfirmDiscardChangesModal, setShowConfirmDiscardChangesModal] =
    useState(false)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [workoutData, setWorkoutData] = useState(thisWorkoutData)
  const axiosPrivate = useAxiosPrivate()
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  // const SESSION_URL = `/api/users/${auth.userId}/sessions/${selectedWorkoutId}`
  const { workoutUpdated } = useToast()
  const { updateUserSession } = useSessions()
  const { theme } = useTheme()

  function handleEditWorkoutName(e) {
    const newName = e.target.value
    setWorkoutData({ ...workoutData, name: newName })
  }
  function handleEditWorkoutNotes(e) {
    const newNotes = e.target.value
    setWorkoutData({ ...workoutData, notes: newNotes })
  }

  function addExercise(exercise) {
    const exerciseToBeAdded = {
      name: exercise.name,
      sets: [{ reps: "", weight: "", rpe: "" }],
      exerciseId: exercise._id,
    }
    const updatedExercises = [...workoutData.exercises, exerciseToBeAdded]
    setWorkoutData({ ...workoutData, exercises: updatedExercises })
  }

  const saveSessionChanges = async () => {
    const success = await updateUserSession({
      userId: auth.userId,
      userSessionId: workoutData._id,
      updatedSessionData: workoutData,
    })
    if (success) {
      onClose() // closes modal
      workoutUpdated() // toast
    }
  }

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 w-[100%] h-[95%] px-6  pb-6 rounded-2xl border border-slate-600 max-w-[1300px]">
          <div className="h-[5%] flex flex-row justify-between items-center gap-2 pt-12">
            <i className="fa fa-heading mr-4 dark:text-white dark:text-opacity-90" />
            <Input
              variant="flushed"
              value={workoutData.name}
              onChange={handleEditWorkoutName}
              marginRight={"30px"}
              color={theme === "dark" ? "white" : ""}
            />
            <Button onClick={saveSessionChanges}>Save</Button>
          </div>

          <div className="grow mt-6 overflow-auto">
            <div className="space-y-2 mt-4">
              <div className="flex flex-row items-center">
                <i className="fa fa-pen mr-4 dark:text-white dark:text-opacity-90" />
                <Input
                  placeholder="Notes"
                  variant="flushed"
                  value={workoutData.notes}
                  onChange={(e) => handleEditWorkoutNotes(e)}
                  marginRight={"30px"}
                  color={theme === "dark" ? "white" : ""}
                />
              </div>

              {/* Liste des exos */}
              <div className="h-1/2 overflow-auto space-y-3">
                {workoutData.exercises.map((exercise, index) => (
                  <ExerciseInWorkout
                    key={index}
                    exercise={exercise}
                    workoutData={workoutData}
                    setWorkoutData={setWorkoutData}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 space-x-1 text-center">
            <Button onClick={() => setShowAddExerciseModal(true)}>
              Add Exercises
            </Button>
            <Button
              onClick={() => setShowConfirmDiscardChangesModal(true)}
              variant="destructive"
            >
              Discard changes
            </Button>
          </div>
          {/* <button onClick={() => console.log(workoutData)}>
            consolelog workout data
          </button> */}
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

      {showConfirmDiscardChangesModal &&
        createPortal(
          <ConfirmDiscardChangesModal
            onClose={() => setShowConfirmDiscardChangesModal(false)}
            onCancelEditWorkout={onClose}
          />,
          document.body
        )}
    </>
  )
}
