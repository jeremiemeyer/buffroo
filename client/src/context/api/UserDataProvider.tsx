//@ts-nocheck
import { createContext, useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"

const UserDataContext = createContext({})

export const UserDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const getUserData = async () => {
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
      const updatedUserResponse = response.data.userData
      setUserData(updatedUserResponse)
      return true
    } catch (error) {
      console.error("Error updating user data:", error)
      return false
    }
  }

  useEffect(() => {
    if (auth.userId) {
      getUserData()
    }
  }, [auth.userId])

  return (
    <UserDataContext.Provider
      value={{ userData, getUserData, setUserData, updateUserData, isLoading }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContext
