//@ts-nocheck
import { Box, SkeletonText } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import Title from "../components/layout/Title"
import { useNavigate, Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import { useEffect, useState } from "react"
import Settings from "../components/pages/profile/Settings"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useWorkoutStatus from "../hooks/useWorkoutStatus"
import useToast from "@/hooks/useToast"
import Dashboard from "@/components/pages/profile/dashboard/Dashboard"
import useUserData from "@/hooks/api/useUserData"

export default function Profile() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useWorkoutStatus()
  const axiosPrivate = useAxiosPrivate()
  const { userData, setUserData, updateUserData, isLoading } = useUserData()
  const { cannotLogOutWorkoutInProgress, preferencesSaved } = useToast()

  const signOut = async () => {
    workoutIsInProgress ? cannotLogOutWorkoutInProgress() : await logout()
  }

  return (
    <>
      <div>
        {/* Title  */}
        <div className="fixed px-6 bg-glassmorphism2 top-0 left-0 w-full z-[10]">
          <Title className="z-[500]">Profile</Title>
        </div>

        {/* Content  */}
        <div className="pt-[80px] pb-[100px] z-[0] px-4 w-full">
          {/* <button onClick={() => console.log(auth)}>Click</button> */}

          <p className="pb-8 text-xl">Hello, {auth.username}! 👋</p>

          {isLoading ? (
            <>
              <h1 className="text-2xl font-light mb-4">Settings</h1>
              <Box className="rounded-3xl border bg-white py-6 px-6 max-w-[800px] mx-auto">
                <SkeletonText noOfLines={8} spacing="4" skeletonHeight="2" />
              </Box>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
              <Dashboard userData={userData} updateUserData={updateUserData} />
              <h1 className="pt-8 text-2xl font-semibold mb-4">Settings</h1>
              <Settings
                userData={userData}
                updateUserData={updateUserData}
                // saveUserData={saveUserPreferences}
              />
            </>
          )}

          <Button variant="destructive" onClick={signOut} className="mt-12">
            Sign out
          </Button>
          {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}
        </div>
      </div>
    </>
  )
}
