//@ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "../useAuth"
import useAxiosPrivate from "../useAxiosPrivate"
import useToast from "../useToast"

const useSessions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sessionsData, setSessionsData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { cannotSubmitEmptyWorkout } = useToast()

  const getUserSessions = async () => {
    const SESSIONS_URL = `/api/users/${auth.userId}/sessions`
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(SESSIONS_URL, {
        withCredentials: true,
      })
      // isMounted &&
      setSessionsData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching sessions data:", error)
    }
  }

  const createUserSession = async ({ userId, userSessionData }) => {
    const SESSIONS_URL = `/api/users/${userId}/sessions`

    console.log(userSessionData)

    if (userSessionData.exercises.length === 0) {
      return cannotSubmitEmptyWorkout()
    }

    const dataToSend = {
      ...userSessionData,
      enddate: new Date().toISOString(),
    }

    // console.log("data sent: ", dataToSend)
    // console.log("user id", auth.userId)

    try {
      await axiosPrivate.post(SESSIONS_URL, dataToSend)
      return true
    } catch (error) {
      console.error("Error creating user session:", error)
      return false
    }
  }

  const updateUserSession = async ({
    userId,
    userSessionId,
    updatedSessionData,
  }) => {
    const SESSION_UPDATE_URL = `/api/users/${userId}/sessions/${userSessionId}`
    try {
      const response = await axiosPrivate.put(
        SESSION_UPDATE_URL,
        updatedSessionData
      )
      const updatedSessionDataResponse = response.data
      return true
    } catch (error) {
      console.error("Error updating session:", error)
      return false
    }
  }

  const deleteUserSession = async ({ userId, userSessionId }) => {
    console.log(userSessionId)
    try {
      const response = await axiosPrivate.delete(
        `/api/users/${userId}/sessions/${userSessionId}`,
        {
          withCredentials: true,
        }
      )
      return true
    } catch (error) {
      console.error("Error deleting session:", error)
      return false
    }
  }

  useEffect(() => {
    getUserSessions()
  }, [])

  return {
    sessionsData,
    getUserSessions,
    createUserSession,
    updateUserSession,
    deleteUserSession,
    isLoading,
  }
}

export default useSessions
