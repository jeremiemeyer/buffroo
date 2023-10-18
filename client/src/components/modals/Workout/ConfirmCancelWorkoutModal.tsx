// @ts-nocheck
import { Button, Input } from "@chakra-ui/react"

export default function ConfirmCancelWorkoutModal({ onClose, onCancelWorkout }) {
  function handleCancel(){
    onCancelWorkout()
    onClose()
  }

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
            <h1 className="font-semibold text-xl">Cancel workout?</h1>
            <p className="py-4">
              Are you sure you want to cancel this workout? All progress will be
              lost.
            </p>
            <div className="grid grid-rows-2 gap-2">
              <Button onClick={handleCancel} colorScheme="red">Cancel workout</Button>
              <Button onClick={onClose} colorScheme="blue">Resume</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
