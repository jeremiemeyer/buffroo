//@ts-nocheck
import { Button } from "@/components/ui/button"
import useWorkoutData from "@/hooks/useWorkoutData"
import useWorkoutStopwatch from "@/hooks/useWorkoutStopwatch"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmCancelWorkoutModal({
  onClose,
  onCancelWorkout,
}) {
  const { resetWorkout } = useWorkoutData()
  const { reset } = useWorkoutStopwatch()
  const { pause } = useWorkoutTimer()

  function handleCancel() {
    onCancelWorkout()
    resetWorkout()
    pause() // pauses timer
    reset() // reset stopwatch
    onClose()
  }

  return (
    <ModalTemplate onClose={onClose}>
      <div className="h-[5%] flex flex-col justify-between items-center">
        <h1 className="text-2xl dark:text-white dark:text-opacity-90">
          Cancel workout?
        </h1>
        <p className="py-4 dark:text-white dark:text-opacity-80">
          Are you sure you want to cancel this workout? All progress will be
          lost.
        </p>
        <div className="grid grid-rows-2 gap-2">
          <Button onClick={handleCancel} variant="destructive">
            Cancel workout
          </Button>
          <Button onClick={onClose}>Resume</Button>
        </div>
      </div>
    </ModalTemplate>
  )
}
