//@ts-nocheck
import { Button } from "@chakra-ui/react"
import Title from "./layout/Title"
import { useNavigate, Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuth from "../hooks/useAuth"

export default function Profile() {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()

  const signOut = async () => {
    await logout()
  }

  return (
    <>
      <div className="fixed bg-white w-screen">
        <Title className="z-[500]">Profile</Title>
      </div>
      <div className="pt-[80px] pb-[100px] z-[0]">
        <p className="pb-8 text-xl">Hello, {auth.user}!</p>
        <Button onClick={signOut} colorScheme="blue">
          Sign out
        </Button>
      </div>
    </>
  )
}
