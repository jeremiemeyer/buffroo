// @ts-nocheck
import { Button, Input } from "@chakra-ui/react"
import { useState, useContext } from "react"
import WorkoutStatusContext from "../../context/WorkoutStatusProvider"
import WorkoutDataContext from "../../context/WorkoutDataProvider"
import WorkoutTimerContext from "../../context/WorkoutTimerProvider"

export default function ConfirmDeleteSessionModal({ deleteSession, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-100 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="h-[5%] flex flex-col justify-between items-center">
            <h1 className="font-light text-2xl">Delete workout?</h1>
            <p className="py-4">
              Are you sure you want to delete this workout from your history?
              This action cannot be undone.
            </p>
            <div className="grid grid-rows-2 gap-2">
              <Button
                onClick={onClose}
                colorScheme="blue"
                borderRadius="16px"
                fontWeight={"400"}
              >
                Cancel
              </Button>
              <Button
                onClick={deleteSession}
                colorScheme="red"
                borderRadius="16px"
                fontWeight={"400"}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
