//@ts-nocheck
import { Button } from "@/components/ui/button"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmDiscardChangesModal({
  onClose,
  onCancelEditWorkout,
}) {
  return (
    <>
      <ModalTemplate onClose={onClose}>
        <div className="h-[5%] flex flex-col justify-between items-center">
          <h1 className="text-2xl dark:text-white dark:text-opacity-90">
            Discard changes?
          </h1>
          <p className="py-4 dark:text-white dark:text-opacity-80">
            Are you sure you want to discard changes made to this workout?
          </p>
          <div className="grid grid-rows-2 gap-2">
            <Button onClick={onClose}>Back to edit</Button>
            <Button onClick={onCancelEditWorkout} variant="destructive">
              Discard changes
            </Button>
          </div>
        </div>
      </ModalTemplate>
    </>
  )
}
