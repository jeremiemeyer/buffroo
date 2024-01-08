//@ts-nocheck
import { Button } from "@/components/ui/button"
import useSessions from "@/hooks/api/useSessions"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import ModalTemplate from "@/components/ModalTemplate"

export default function ConfirmDeleteSessionModal({ onClose, sessionData }) {
  const { deleteUserSession } = useSessions()
  const { auth } = useAuth()
  const { workoutDeleted } = useToast()

  async function deleteSession() {
    const success = await deleteUserSession({
      userId: auth.userId,
      userSessionId: sessionData._id,
    })
    if (success) {
      onClose()
      workoutDeleted() // toast
    }
  }

  return (
    <>
      <ModalTemplate onClose={onClose}>
        <div className="h-[5%] flex flex-col justify-between items-center">
          <h1 className="font-light text-2xl dark:text-white dark:text-opacity-90">
            Delete workout?
          </h1>
          <p className="py-4 dark:text-white dark:text-opacity-80">
            Are you sure you want to delete this workout from your history? This
            action cannot be undone.
          </p>
          <div className="grid grid-rows-2 gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={deleteSession} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </ModalTemplate>
    </>
  )
}
