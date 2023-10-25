// @ts-nocheck
import { createPortal } from "react-dom"
import AddExerciseToWorkoutModal from "./AddExerciseToWorkoutModal"
import ExerciseInWorkout from "./ExerciseInWorkout"
import ConfirmCancelWorkoutModal from "./ConfirmCancelWorkoutModal"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import { useState, useContext, useEffect } from "react"
import WorkoutStatusContext from "../../context/WorkoutStatusProvider"
import WorkoutDataContext from "../../context/WorkoutDataProvider"
import WorkoutTimerContext from "../../context/WorkoutTimerProvider"
import Stopwatch from "./Stopwatch"
import { useStopwatch } from "react-timer-hook"

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
    handleEditWorkoutNotes,
    handleEditWorkoutName,
    addExercise,
    resetWorkout,
  } = useContext(WorkoutDataContext)

  const { reset, start, pause } = useContext(WorkoutTimerContext)

  async function saveSession() {
    if (workoutData.exercises.length === 0) {
      return alert("You can't submit an empty workout!")
    }

    const dataToSend = {
      ...workoutData,
      enddate: new Date().toISOString(),
    }

    console.log("data sent: ", dataToSend)
    console.log("user id", auth.userId)

    try {
      await axiosPrivate.post(SESSIONS_URL, dataToSend)
      alert("New session added!")
      resetWorkout()
      reset() // reset timer
    } catch (error) {
      return console.log("error")
    }
    onClose()
  }

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-100 text-slate-900 w-[100%] h-[95%] px-6  pb-6 rounded-2xl border border-slate-600 ">
          <div className="text-center">
            <Menu>
              <MenuButton
                className="hover:bg-slate-300"
                as={IconButton}
                aria-label="Options"
                onClick={() => setSessionWindowIsMinimized(true)}
                icon={
                  sessionWindowIsMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />
                }
                variant="filled"
              />
            </Menu>
          </div>
          <div className="pb-2">
            <Stopwatch />
          </div>

          <div className="h-[5%] flex flex-row justify-between items-center gap-2">
            <Input value={workoutData.name} onChange={handleEditWorkoutName} />
            <Button
              onClick={saveSession}
              colorScheme="green"
              borderRadius="16px"
            >
              Finish
            </Button>
          </div>

          <div className="grow mt-6 overflow-auto">
            <div className="space-y-2 mt-4">
              <Input
                placeholder="Notes"
                value={workoutData.notes}
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

          <div className="mt-4 space-x-1 text-center">
            <Button
              onClick={() => setShowAddExerciseModal(true)}
              colorScheme="blue"
              borderRadius="16px"
            >
              Add Exercises
            </Button>
            <Button
              onClick={() => setShowConfirmCancelWorkoutModal(true)}
              colorScheme="red"
              borderRadius="16px"
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
