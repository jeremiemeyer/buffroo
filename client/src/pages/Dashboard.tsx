//@ts-nocheck
import { Box, SkeletonText } from "@chakra-ui/react"
import DashboardContent from "@/components/pages/dashboard/dashboard/DashboardContent"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useAuth from "@/hooks/useAuth"
import useLogout from "@/hooks/useLogout"
import useToast from "@/hooks/useToast"
import useUserData from "@/hooks/api/useUserData"
import SquircleTile from "@/components/ui/squircle-tile"
import { useEffect } from "react"

export default function Dashboard() {
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useWorkoutStatus()
  const { userData, updateUserData, isLoading } = useUserData()
  const { cannotLogOutWorkoutInProgress, preferencesSaved } = useToast()

  const signOut = async () => {
    workoutIsInProgress ? cannotLogOutWorkoutInProgress() : await logout()
  }

  useEffect(() => {
    console.log(isLoading)
  }, [])

  return (
    <>
      {/* Content  */}
      <div className="pt-[80px] pb-[100px] z-[0] px-4 w-full">
        {/* <p className="pb-8 text-xl dark:text-white dark:text-opacity-90">
          Hello, {auth.username}! 👋
        </p> */}

        {isLoading ? (

          Array.from({ length: 4 }).map((_, index) => (
            <SquircleTile>
              <SkeletonText noOfLines={8} spacing="4" skeletonHeight="2" />
            </SquircleTile>
          ))
        ) : (
          <>
            <DashboardContent userData={userData} updateUserData={updateUserData} />
          </>
        )}


      </div>
    </>
  )
}
