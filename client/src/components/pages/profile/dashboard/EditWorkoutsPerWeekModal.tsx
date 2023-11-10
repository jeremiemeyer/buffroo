//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Input } from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import useUserData from "@/hooks/api/useUserData"
import useTheme from "@/hooks/useTheme"

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
  const { getUserData } = useUserData()
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
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="flex flex-row justify-between items-center text-center">
            <Button onClick={onClose} variant="destructive">
              X
            </Button>
            <h1 className="text-2xl text-center px-5 dark:text-white dark:text-opacity-90">Set Workout Target</h1>
            <Button onClick={handleClick}>Save</Button>
          </div>

          <div className="pt-4 dark:text-white dark:text-opacity-80 pb-2">Target Workouts per Week</div>
          <Input
            ref={workoutsPerWeekInputRef}
            value={updatedWorkoutsPerWeekGoal}
            onChange={(e) => setUpdatedWorkoutsPerWeekGoal(e.target.value)}
            className=" dark:bg-gray-600 dark:border-gray-600"
            color={theme === "dark" ? "white" : ""}
          />
          {/* <button onClick={() => console.log(updatedWorkoutsPerWeekGoal)}>consolelog updatedWorkoutsPerWeekGoal</button> */}
        </div>
      </div>
    </>
  )
}
