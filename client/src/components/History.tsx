//@ts-nocheck
import WorkoutSessionCard from "./history/WorkoutSessionCard"
import Title from "./layout/Title"
import { useState, useEffect } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"

export default function History() {
  const [historyData, setHistoryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()

  const HISTORY_URL = `/api/users/${auth.userId}/sessions`

  const getWorkoutHistory = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(HISTORY_URL, {
        withCredentials: true,
      })
      // isMounted &&
      setHistoryData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getWorkoutHistory()
  }, [historyData.length])

  const deleteWorkoutSession = async (sessionId) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/users/${auth.userId}/sessions/${sessionId}`,
        {
          withCredentials: true,
        }
      )
      if (response.status === 200) {
        // Call the callback function to update the workout history
        updateWorkoutHistory()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
    }
  }

  const updateWorkoutHistory = () => {
    getWorkoutHistory()
  }

  return (
    <>
      <div className="px-6 bg-gray-200  fixed top-0 left-0 w-full">
        <Title className="h-[10%] z-[500]">History</Title>
      </div>
      <div className="pt-[80px] pb-[100px] z-[0]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              className="border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left cursor-pointer mt-2 w-[calc(100%-40px)] p-[20px] mx-auto"
            >
              <SkeletonText noOfLines={1} skeletonHeight="10" />
              <SkeletonText noOfLines={2} skeletonHeight="6" />
              <SkeletonText noOfLines={3} skeletonHeight="6" />
            </Box>
          ))
        ) : (
          <>
            {/* <p>bonjour</p>
            <button onClick={() => console.log(historyData)}>
              Get history data
            </button> */}
            {historyData && historyData.length > 0 ? (
              historyData.map((session, index) => (
                <WorkoutSessionCard
                  key={index}
                  sessionData={historyData[index]}
                  deleteWorkoutSession={deleteWorkoutSession}
                />
              ))
            ) : (
              <p className="text-xl text-">
                Your workout history is empty. 😥 <br /> Go ahead and{" "}
                <Link to="/">
                  <span className="text-gray-500 font-semibold underline decoration-gray-300">
                    start a workout session
                  </span>
                </Link>
                ! 💪
              </p>
            )}
          </>
        )}
      </div>

      {/* <button onClick={() => console.log(historyData[0])}>ok</button> */}
    </>
  )
}
