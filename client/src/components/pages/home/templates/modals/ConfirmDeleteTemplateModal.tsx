//@ts-nocheck
import { Button } from "@/components/ui/button"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"
import useTemplates from "@/hooks/api/useTemplates"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmDeleteTemplateModal({ onClose, templateData }) {
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
    <ModalTemplate onClose={onClose}>
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl dark:text-white dark:text-opacity-90">
          Delete template?
        </h1>
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
    </ModalTemplate>
  )
}