//@ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useToast from "@/hooks/useToast"

const useUserData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { preferencesSaved } = useToast()

  const getUserData = async () => {
    const userId = auth.userId
    const USER_DATA_URL = `/api/users/${auth.userId}`

    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(USER_DATA_URL)
      const userObject = response.data
      setUserData(userObject.userData)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const updateUserData = async ({ userId, updatedUserData }) => {
    const USER_DATA_URL = `/api/users/${userId}`

    try {
      const response = await axiosPrivate.patch(USER_DATA_URL, {
        userData: updatedUserData,
      })
      setUserData(updatedUserData)
      const updatedUserResponse = response.data
      return true
    } catch (error) {
      console.error("Error updating user data:", error)
      return false
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return {
    userData,
    getUserData,
    setUserData,
    updateUserData,
    isLoading,
  }
}

export default useUserData
