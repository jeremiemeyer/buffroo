//@ts-nocheck
import { Button } from "@/components/ui/button"
import ModalTemplate from "@/components/ModalTemplate"

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
    <ModalTemplate onClose={onClose}>
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl dark:text-white dark:text-opacity-90">
          Start workout from template?
        </h1>
        <p className="py-4 dark:text-white dark:text-opacity-80">
          Do you wish to start a new workout from template{" "}
          <span className="italic">{templateData.name}</span>?
        </p>
        <div className="grid grid-rows-2 gap-2">
          <Button onClick={handleClick}>Start from template</Button>
          <Button onClick={onClose} variant="destructive">
            Cancel
          </Button>
        </div>
      </div>
    </ModalTemplate>
  )
}
