//@ts-nocheck
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react"

export default function ConfirmCancelEditTemplateModal({onClose, onConfirmCancelEdit}) {
  return (
    <div
    onClick={onClose}
    className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-[900] relative bg-gray-100 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
    >
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl">Discard changes?</h1>
        <p className="py-4">
          Are you sure you want to discard the changes made to this template?
        </p>
        <div className="grid grid-rows-2 gap-2">
          <Button
            onClick={onConfirmCancelEdit}
            colorScheme="red"
            borderRadius="16px"
            fontWeight={"400"}
          >
            Discard changes
          </Button>
          <Button
            onClick={onClose}
            colorScheme="blue"
            borderRadius="16px"
            fontWeight={"400"}
          >
            Back to template
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}