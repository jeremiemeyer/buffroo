//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Input } from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import useUserData from "@/hooks/api/useUserData"

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
        className="fixed z-[700] inset-0 bg-slate-700/75 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 text-slate-900 px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="flex flex-row justify-between items-center text-center">
            <Button onClick={onClose} variant="destructive">
              X
            </Button>
            <h1 className="text-2xl text-center px-5">Set Workout Target</h1>
            <Button onClick={handleClick}>Save</Button>
          </div>

          <div className="pt-4">Target Workouts per Week</div>
          <Input
            ref={workoutsPerWeekInputRef}
            value={updatedWorkoutsPerWeekGoal}
            onChange={(e) => setUpdatedWorkoutsPerWeekGoal(e.target.value)}
          />
          {/* <button onClick={() => console.log(updatedWorkoutsPerWeekGoal)}>consolelog updatedWorkoutsPerWeekGoal</button> */}
        </div>
      </div>
    </>
  )
}
