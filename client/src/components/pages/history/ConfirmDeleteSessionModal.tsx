// @ts-nocheck
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import WorkoutStatusContext from "../../../context/WorkoutStatusProvider"
import WorkoutDataContext from "../../../context/WorkoutDataProvider"
import WorkoutTimerContext from "../../../context/WorkoutStopwatchProvider"
import useSessions from "@/hooks/api/useSessions"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"


export default function ConfirmDeleteSessionModal({ onClose, sessionData }) {
  const { sessionsData, deleteUserSession } = useSessions()
  const { auth } = useAuth()
  const { workoutDeleted } = useToast()

  async function deleteSession() {
    const success = await deleteUserSession({
      userId: auth.userId,
      userSessionId: sessionData._id,
    })
    if (success) {
      onClose()
      workoutDeleted() // toast
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="h-[5%] flex flex-col justify-between items-center">
            <h1 className="font-light text-2xl dark:text-white dark:text-opacity-90">Delete workout?</h1>
            <p className="py-4 dark:text-white dark:text-opacity-80">
              Are you sure you want to delete this workout from your history?
              This action cannot be undone.
            </p>
            <div className="grid grid-rows-2 gap-2">
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={deleteSession} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
