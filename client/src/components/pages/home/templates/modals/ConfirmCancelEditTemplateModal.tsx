//@ts-nocheck
import { Button } from "@/components/ui/button"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmCancelEditTemplateModal({
  onClose,
  onConfirmCancelEdit,
}) {
  return (
    <ModalTemplate onClose={onClose}>
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl">Discard changes?</h1>
        <p className="py-4">
          Are you sure you want to discard the changes made to this template?
        </p>
        <div className="grid grid-rows-2 gap-2">
          <Button onClick={onConfirmCancelEdit} variant="destructive">
            Discard changes
          </Button>
          <Button onClick={onClose}>Back to template</Button>
        </div>
      </div>
    </ModalTemplate>
  )
}
