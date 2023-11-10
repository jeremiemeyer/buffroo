//@ts-nocheck
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"
import useTemplates from "@/hooks/api/useTemplates"

export default function ConfirmDeleteTemplateModal({
  onClose,
  onConfirmDeleteTemplate,
  templateData,
}) {
  const { templateDeleted } = useToast()
  const { auth } = useAuth()
  const { deleteUserTemplate } = useTemplates()

  async function onConfirmDelete() {
    const success = await deleteUserTemplate({
      userId: auth.userId,
      templateId: templateData._id,
    })
    if (success === true) {
      onClose() // closes modal
      templateDeleted() // toast
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 text-slate-900 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
      >
        <div className="h-[5%] flex flex-col justify-between items-center">
          <h1 className="text-2xl dark:text-white dark:text-opacity-90">Delete template?</h1>
          <p className="py-4 dark:text-white dark:text-opacity-80">
            Are you sure you want to delete this template? This action cannot be
            undone.
          </p>
          <div className="grid grid-rows-2 gap-2">
            <Button onClick={onConfirmDelete} variant="destructive">
              Delete template
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
