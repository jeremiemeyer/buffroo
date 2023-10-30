//@ts-nocheck
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import useToast from "../../../hooks/useToast"

export default function ConfirmDeleteTemplateModal({
  onClose,
  onConfirmDeleteTemplate,
  getUserTemplates
}) {
  const { templateDeleted } = useToast()
  function onConfirmDelete() {
    onConfirmDeleteTemplate()
    onClose()
    getUserTemplates()
    templateDeleted()
    // alert("Template deleted!")
  }
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
          <h1 className="text-2xl">Delete template?</h1>
          <p className="py-4">
            Are you sure you want to delete this template? This action cannot be
            undone.
          </p>
          <div className="grid grid-rows-2 gap-2">
            <Button
              onClick={onConfirmDelete}
              colorScheme="red"
              borderRadius="16px"
              fontWeight={"400"}
            >
              Delete template
            </Button>
            <Button
              onClick={onClose}
              colorScheme="blue"
              borderRadius="16px"
              fontWeight={"400"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
