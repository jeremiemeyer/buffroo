//@ts-nocheck
import WorkoutSessionCard from "./history/WorkoutSessionCard"
import Title from "./layout/Title"
import { useState, useEffect } from "react"
import {
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
import { createPortal } from "react-dom"
import EditWorkoutModal from "./history/EditWorkoutModal"
import useToast from "../hooks/useToast"
import { Button } from "@/components/ui/button"

export default function History() {
  const [historyData, setHistoryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("")
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false)
  const { workoutDeleted } = useToast()
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

  useEffect(() => {
    if (showEditWorkoutModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showEditWorkoutModal])

  function onClickExerciseCard(exerciseId) {
    setSelectedExerciseId(exerciseId)
    setShowExerciseDetailsModal(true)
  }

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
        workoutDeleted()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
    }
  }

  const handleClickSessionCard = (index) => {
    setSelectedWorkoutId(historyData[index]._id)
    setShowEditWorkoutModal(true)
  }

  const updateWorkoutHistory = () => {
    getWorkoutHistory()
  }

  return (
    <>
      {/* Title  */}
      <div className="px-6 bg-gray-200 bg-glassmorphism2 fixed top-0 left-0 w-full z-[10]">
        <Title className="h-[10%] z-[500]">History</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[80px] z-[0] mx-auto w-full px-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Box key={index}>
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
                  onClick={() => handleClickSessionCard(index)}
                  key={index}
                  sessionData={historyData[index]}
                  deleteWorkoutSession={deleteWorkoutSession}
                />
              ))
            ) : (
              <p className="text-xl">
                Your workout history is empty. 😥 <br /> Go ahead and{" "}
                <Link to="/">
                  <span className="text-gray-500  underline decoration-gray-300">
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
      {showEditWorkoutModal &&
        createPortal(
          <EditWorkoutModal
            selectedWorkoutId={selectedWorkoutId}
            onClose={() => setShowEditWorkoutModal(false)}
            getWorkoutHistory={getWorkoutHistory}
          />,
          document.body
        )}
    </>
  )
}
