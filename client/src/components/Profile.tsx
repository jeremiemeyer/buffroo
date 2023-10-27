//@ts-nocheck
import { Button } from "@chakra-ui/react"
import Title from "./layout/Title"
import { useNavigate, Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuth from "../hooks/useAuth"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import { useContext } from "react"
import Settings from "./profile/Settings"

export default function Profile() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()
  const { workoutIsInProgress } = useContext(WorkoutStatusContext)

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
        <div className="pt-[80px] pb-[100px] z-[0] px-6 space-y-12">
          {/* <button onClick={() => console.log(auth)}>Click</button> */}

          <p className="pb-8 text-xl">Hello, {auth.username}! 👋</p>

          <Settings />

          <Button onClick={signOut} colorScheme="red" borderRadius="16px">
            Sign out
          </Button>
        </div>
      </div>
    </>
  )
}
