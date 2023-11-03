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

export default function Profile() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useWorkoutStatus()
  const axiosPrivate = useAxiosPrivate()
  const USER_DATA_URL = `/api/users/${auth.userId}`
  const [userPreferences, setUserPreferences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { cannotLogOutWorkoutInProgress, preferencesSaved } = useToast()

  const getUserPreferences = async () => {
    try {
      const response = await axiosPrivate.get(USER_DATA_URL)
      const userData = response.data
      setUserPreferences(userData.preferences)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const saveUserPreferences = async () => {
    try {
      const response = await axiosPrivate.patch(USER_DATA_URL, {
        userPreferences: userPreferences,
      })
      const updatedUser = response.data
      preferencesSaved()
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  useEffect(() => {
    // console.log(USER_DATA_URL)
    getUserPreferences()
  }, [])

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
        <div className="pt-[80px] pb-[100px] z-[0] px-6 space-y-12 w-full">
          {/* <button onClick={() => console.log(auth)}>Click</button> */}

          <p className="pb-8 text-xl">Hello, {auth.username}! 👋</p>

          <h1 className="text-2xl font-light">Settings</h1>
          {isLoading ? (
            <>
              <Box className="rounded-3xl border bg-gray-200 pb-6 px-6 max-w-[800px] mx-auto">
                <SkeletonText
                  noOfLines={8}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            </>
          ) : (
            <Settings
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
              saveUserPreferences={saveUserPreferences}
            />
          )}

          <Button variant="destructive" onClick={signOut}>
            Sign out
          </Button>
          {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}
        </div>
      </div>
    </>
  )
}
