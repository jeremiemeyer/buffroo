//@ts-nocheck
import { Box, SkeletonText } from "@chakra-ui/react"
import DashboardContent from "@/components/pages/dashboard/dashboard/DashboardContent"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useAuth from "@/hooks/useAuth"
import useLogout from "@/hooks/useLogout"
import useToast from "@/hooks/useToast"
import useUserData from "@/hooks/api/useUserData"

export default function Dashboard() {
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useWorkoutStatus()
  const { userData, updateUserData, isLoading } = useUserData()
  const { cannotLogOutWorkoutInProgress, preferencesSaved } = useToast()

  const signOut = async () => {
    workoutIsInProgress ? cannotLogOutWorkoutInProgress() : await logout()
  }

  return (
    <>
      {/* Content  */}
      <div className="pt-[80px] pb-[100px] z-[0] px-4 w-full">
        <p className="pb-8 text-xl dark:text-white dark:text-opacity-90">
          Hello, {auth.username}! 👋
        </p>

        {isLoading ? (
          <>
            <h1 className="text-2xl font-light mb-4">Settings</h1>
            <Box className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  py-6 px-6 max-w-[800px] mx-auto">
              <SkeletonText noOfLines={8} spacing="4" skeletonHeight="2" />
            </Box>
          </>
        ) : (
          <>
            <DashboardContent userData={userData} updateUserData={updateUserData} />
          </>
        )}


      </div>
    </>
  )
}
