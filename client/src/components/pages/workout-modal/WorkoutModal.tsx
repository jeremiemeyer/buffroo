//@ts-nocheck
import { createPortal } from "react-dom"
import AddExerciseToWorkoutModal from "./modals/AddExerciseToWorkoutModal"
import ExerciseInWorkout from "./ExerciseInWorkout"
import ConfirmCancelWorkoutModal from "./modals/ConfirmCancelWorkoutModal"
import useAuth from "@/hooks/useAuth"
import { Input, Menu, MenuButton, IconButton } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { useState } from "react"
import Stopwatch from "./Stopwatch"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useWorkoutData from "@/hooks/useWorkoutData"
import useToast from "@/hooks/useToast"
import useSessions from "@/hooks/api/useSessions"
import StartTimerModal from "./StartTimerModal"
import TimerButton from "./TimerButton"
import useWorkoutStopwatch from "@/hooks/useWorkoutStopwatch"
import useTheme from "@/hooks/useTheme"
import ModalTemplate from "@/components/ModalTemplate"

export default function WorkoutModal({ onClose }: any) {
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmCancelWorkoutModal, setShowConfirmCancelWorkoutModal] =
    useState(false)
  const { auth } = useAuth()
  const [showStartTimerModal, setShowStartTimerModal] = useState(false)
  const { theme } = useTheme()

  const { sessionWindowIsMinimized, setSessionWindowIsMinimized } =
    useWorkoutStatus()

  const {
    workoutData,
    setWorkoutData,
    handleEditWorkoutNotes,
    handleEditWorkoutName,
    addExercise,
    resetWorkout,
  } = useWorkoutData()

  const { reset } = useWorkoutStopwatch()

  const { workoutAdded } = useToast()
  const { createUserSession } = useSessions()

  async function saveSession() {
    const success = await createUserSession({
      userId: auth.userId,
      userSessionData: workoutData,
    })
    if (success === true) {
      resetWorkout() // workout data reinitialized
      reset() // reset timer
      workoutAdded() // toast
      onClose() // closes modal
    }
  }

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 w-[100%] h-[95%] px-2 md:px-6 pb-4 rounded-2xl border border-slate-600 max-w-[1300px]">
          <div className="text-center">
            <Menu>
              <MenuButton
                className="hover:bg-slate-300 dark:hover:bg-gray-600 dark:text-white"
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
          <div className="dark:text-white dark:text-opacity-90">
            <Stopwatch />
          </div>

          <div className="h-[5%] flex flex-row justify-between items-center gap-2 px-2">
            <TimerButton setShowStartTimerModal={setShowStartTimerModal} />

            <Button onClick={saveSession} variant="secondary">
              Finish
            </Button>
          </div>

          <div className="grow mt-2 overflow-auto ">
            <div className="space-y-2">
              <div className="flex flex-row items-center px-2">
                <i className="fa fa-heading mr-4 dark:text-white dark:text-opacity-90" />
                <Input
                  placeholder="Workout title"
                  variant="flushed"
                  value={workoutData.name}
                  onChange={handleEditWorkoutName}
                  borderColor={"gray.300"}
                  marginRight={"30px"}
                  color={theme === "dark" ? "white" : ""}
                />
              </div>

              <div className="flex flex-row items-center px-2 md:pb-4">
                <i className="fa fa-pen mr-4 dark:text-white dark:text-opacity-90" />
                <Input
                  placeholder="Notes"
                  variant="flushed"
                  value={workoutData.notes}
                  onChange={(e) => handleEditWorkoutNotes(e)}
                  borderColor={"gray.300"}
                  marginRight={"30px"}
                  color={theme === "dark" ? "white" : ""}
                ></Input>
              </div>

              {/* Liste des exos */}
              <div className="h-1/2 overflow-auto space-y-3">
                {workoutData.exercises.length > 0 &&
                  workoutData.exercises.map((exercise, index) => (
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
              onClick={() => setShowConfirmCancelWorkoutModal(true)}
              variant={"destructive"}
            >
              Cancel workout
            </Button>
          </div>
        </div>
      </div>
      {showAddExerciseModal &&
        createPortal(
          <AddExerciseToWorkoutModal
            onClose={() => setShowAddExerciseModal(false)}
            addExercise={addExercise}
            actionType="workout"
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
      {showStartTimerModal &&
        createPortal(
          <StartTimerModal onClose={() => setShowStartTimerModal(false)} />,
          document.body
        )}
    </>
  )
}
