//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Input } from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import useTheme from "@/hooks/useTheme"
import ModalTemplate from "@/components/ModalTemplate"

export default function EditWorkoutsPerWeekModal({
  onClose,
  userData,
  updateUserData,
}) {
  const [updatedWorkoutsPerWeekGoal, setUpdatedWorkoutsPerWeekGoal] = useState(
    userData.goals["workoutsPerWeek"]
  )
  const { auth } = useAuth()
  const { preferencesSaved } = useToast()
  const workoutsPerWeekInputRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    workoutsPerWeekInputRef.current.focus()
  }, [])

  async function handleClick() {
    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: {
        ...userData,
        goals: {
          ...userData.goals,
          workoutsPerWeek: updatedWorkoutsPerWeekGoal,
        },
      },
    })
    if (success === true) {
      onClose() // closes modal
      preferencesSaved() // toast
    }
  }

  return (
    <ModalTemplate onClose={onClose}>
      <div className="flex flex-row justify-between items-center text-center">
        <Button onClick={onClose} variant="destructive">
          X
        </Button>
        <h1 className="text-2xl text-center px-5 dark:text-white dark:text-opacity-90">
          Set Workout Target
        </h1>
        <Button onClick={handleClick}>Save</Button>
      </div>

      <div className="pt-4 dark:text-white dark:text-opacity-80 pb-2">
        Target Workouts per Week
      </div>
      <Input
        ref={workoutsPerWeekInputRef}
        value={updatedWorkoutsPerWeekGoal}
        onChange={(e) => setUpdatedWorkoutsPerWeekGoal(e.target.value)}
        className=" dark:bg-gray-600 dark:border-gray-600"
        color={theme === "dark" ? "white" : ""}
      />
    </ModalTemplate>
  )
}
