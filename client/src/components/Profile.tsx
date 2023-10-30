//@ts-nocheck
import { Button } from "@chakra-ui/react"
import Title from "./layout/Title"
import { useNavigate, Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import { useEffect, useState } from "react"
import Settings from "./profile/Settings"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useWorkoutStatus from "../hooks/useWorkoutStatus"

export default function Profile() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useWorkoutStatus()
  const axiosPrivate = useAxiosPrivate()
  const USER_DATA_URL = `/api/users/${auth.userId}`
  const [userPreferences, setUserPreferences] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      const response = await axiosPrivate.patch(USER_DATA_URL, {userPreferences: userPreferences})
      const updatedUser = response.data
      alert('Preferences saved!')
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  useEffect(() => {
    // console.log(USER_DATA_URL)
    getUserPreferences()
  }, [])



  const signOut = async () => {
    workoutIsInProgress
      ? alert("A workout is in progress. You cannot logout now!")
      : await logout()
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

          { !isLoading && <Settings userPreferences={userPreferences} setUserPreferences={setUserPreferences} saveUserPreferences={saveUserPreferences}/> }

          <Button onClick={signOut} colorScheme="red" fontWeight={"400"} borderRadius="16px">
            Sign out
          </Button>
          {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}

        </div>
      </div>
    </>
  )
}
