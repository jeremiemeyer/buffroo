//@ts-nocheck
import { Button } from "@/components/ui/button"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmDiscardTemplateModal({
  onClose,
  onConfirmDiscardTemplate,
}) {
  function handleDiscard() {
    onConfirmDiscardTemplate()
    onClose()
  }

  return (
    <ModalTemplate onClose={onClose}>
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl dark:text-white dark:text-opacity-90">
          Discard template?
        </h1>
        <p className="py-4 dark:text-white dark:text-opacity-80">
          Are you sure you want to discard this template?
        </p>
        <div className="grid grid-rows-2 gap-2">
          <Button onClick={handleDiscard} variant="destructive">
            Discard template
          </Button>
          <Button onClick={onClose}>Back to template</Button>
        </div>
      </div>
    </ModalTemplate>
  )
}
