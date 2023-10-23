// @ts-nocheck
import { Button, Input } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import AddExerciseToWorkoutModal from "./AddExerciseToWorkoutModal"
import ExerciseInWorkout from "./ExerciseInWorkout"
import ConfirmCancelWorkoutModal from "./ConfirmCancelWorkoutModal"
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import { useState, useContext } from "react"
import WorkoutStatusContext from "../../../context/WorkoutStatusProvider"
import WorkoutDataContext from "../../../context/WorkoutDataProvider"

export default function WorkoutModal({ onClose }: any) {
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmCancelWorkoutModal, setShowConfirmCancelWorkoutModal] =
    useState(false)
  const [workoutModalIsMinimized, setWorkoutModalIsMinimized] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const SESSIONS_URL = `/api/users/${auth.userId}/sessions`
  const {
    workoutIsInProgress,
    setWorkoutIsInProgress,
    sessionWindowIsMinimized,
    setSessionWindowIsMinimized,
  } = useContext(WorkoutStatusContext)

  const {
    workoutData,
    setWorkoutData,
    workoutNotes,
    setWorkoutNotes,
    handleEditWorkoutNotes,
    addExercise,
    resetWorkout
  } = useContext(WorkoutDataContext)
  


  async function saveSession() {
    if (workoutData.exercises.length === 0) {
      return alert("You can't submit an empty workout!")
    }

    const dataToSend = {
      ...workoutData,
      enddate: new Date().toISOString(),
      userId: auth.userId,
    }

    try {
      await axiosPrivate.post(SESSIONS_URL, dataToSend)
      alert("New session added!")
      setWorkoutNotes("")
      resetWorkout()
    } catch (error) {
      return console.log("error")
    }
    onClose()
  }


  return (
    <>
      <div
        // onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
      >
        <div
          // onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-100 text-slate-900 w-[100%] h-[95%] px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="text-center">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                onClick={() =>
                  setSessionWindowIsMinimized(!sessionWindowIsMinimized)
                }
                icon={
                  sessionWindowIsMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />
                }
                variant="filled"
              />
            </Menu>
          </div>
          <div className="h-[5%] flex flex-row justify-between items-center">
            <h1 className="font-semibold text-xl">Workout</h1>
            <Button onClick={saveSession} colorScheme="green">
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
              <div className="h-1/2 overflow-auto space-y-3">
                {workoutData.exercises.length > 0 &&
                  workoutData.exercises.map((exercise, key) => (
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

          <div className="h-[5%] mt-4 space-x-4 max-w-xs mx-auto">
            <Button
              onClick={() => setShowAddExerciseModal(true)}
              colorScheme="blue"
            >
              Add Exercises
            </Button>
            <Button
              onClick={() => setShowConfirmCancelWorkoutModal(true)}
              colorScheme="red"
            >
              Cancel workout
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
      {showConfirmCancelWorkoutModal &&
        createPortal(
          <ConfirmCancelWorkoutModal
            onClose={() => setShowConfirmCancelWorkoutModal(false)}
            onCancelWorkout={onClose}
          />,
          document.body
        )}
    </>
  )
}
