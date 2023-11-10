//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Input } from "@chakra-ui/react"
import { useState } from "react"

export default function ConfirmStartWorkoutFromTemplateModal({
  onClose,
  onConfirmStartWorkoutFromTemplate,
  templateData,
}) {
  function handleClick() {
    onConfirmStartWorkoutFromTemplate()
    onClose()
  }
  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
      >
        <div className="h-[5%] flex flex-col justify-between items-center">
          <h1 className="text-2xl dark:text-white dark:text-opacity-90">Start workout from template?</h1>
          <p className="py-4 dark:text-white dark:text-opacity-80">
            Do you wish to start a new workout from template <span className="italic">{templateData.name}</span>
            ?
          </p>
          <div className="grid grid-rows-2 gap-2">
            <Button
              onClick={handleClick}
            >
              Start from template
            </Button>
            <Button
              onClick={onClose}
              variant="destructive"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
