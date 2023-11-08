//@ts-nocheck
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useToast from "@/hooks/useToast"

const SessionsContext = createContext({})

export const SessionsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sessionsData, setSessionsData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { cannotSubmitEmptyWorkout } = useToast()

  const getUserSessions = async () => {
    const SESSIONS_URL = `/api/users/${auth.userId}/sessions`
    console.log("auth", auth)
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(SESSIONS_URL, {
        withCredentials: true,
      })
      // isMounted &&
      setSessionsData(response.data)
      console.log(response.data)
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

    try {
      const response = await axiosPrivate.post(SESSIONS_URL, dataToSend)
      console.log("sessionsData:", sessionsData)
      // setSessionsData([...sessionsData, newUserSession.data])
      const updatedSessionsData = [...sessionsData, response.data]
      console.log("updatedSessionsData", updatedSessionsData)
      // Set the updated data back in the state
      setSessionsData(updatedSessionsData)
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
      console.log(sessionsData)
      const response = await axiosPrivate.put(
        SESSION_UPDATE_URL,
        updatedSessionData
      )
      const updatedSessionDataResponse = response.data

      // Find the index of the session in sessionsData
      const sessionIndex = sessionsData.findIndex(
        (session) => session._id === userSessionId
      )
      // Create a copy of the sessionsData object
      const updatedSessionsData = [...sessionsData]
      // Update the session with new data
      updatedSessionsData[sessionIndex] = updatedSessionDataResponse
      // Set the updated data back in the state
      setSessionsData(updatedSessionsData)

      return true
    } catch (error) {
      console.error("Error updating session:", error)
      return false
    }
  }

  const deleteUserSession = async ({ userId, userSessionId }) => {
    // console.log(userSessionId)
    try {
      const response = await axiosPrivate.delete(
        `/api/users/${userId}/sessions/${userSessionId}`,
        {
          withCredentials: true,
        }
      )
      const updatedSessionsData = sessionsData.filter(
        (session) => session._id !== userSessionId
      )
      setSessionsData(updatedSessionsData)
      return true
    } catch (error) {
      console.error("Error deleting session:", error)
      return false
    }
  }

  useEffect(() => {
    if (auth.userId) {
      getUserSessions()
    }
  }, [auth.userId])

  return (
    <SessionsContext.Provider
      value={{
        sessionsData,
        getUserSessions,
        createUserSession,
        updateUserSession,
        deleteUserSession,
        isLoading,
      }}
    >
      {children}
    </SessionsContext.Provider>
  )
}

export default SessionsContext
