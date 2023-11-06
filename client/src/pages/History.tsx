//@ts-nocheck
import Title from "../components/layout/Title"
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
import { createPortal } from "react-dom"
import EditWorkoutModal from "../components/pages/history/EditWorkoutModal"
import useToast from "../hooks/useToast"
import { Button } from "@/components/ui/button"
import useSessions from "@/hooks/api/useSessions"
import WorkoutSessionsList from "@/components/pages/history/WorkoutSessionsList"

export default function History() {
  const axiosPrivate = useAxiosPrivate()
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("")
  const { workoutDeleted } = useToast()
  const { auth } = useAuth()
  const { sessionsData, isLoading, getUserSessions, deleteUserSession } =
    useSessions()
  const [filteredSessionsData, setFilteredSessionsData] = useState([])


  const HISTORY_URL = `/api/users/${auth.userId}/sessions`

  useEffect(() => {
    setFilteredSessionsData(sessionsData)
  }, [sessionsData])


  function onClickExerciseCard(exerciseId) {
    setSelectedExerciseId(exerciseId)
    setShowExerciseDetailsModal(true)
  }

  return (
    <>
      {/* Title  */}
      <div className="px-6 bg-gray-200 bg-glassmorphism2 fixed top-0 left-0 w-full z-[10]">
        <Title className="h-[10%] z-[500]">History</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[80px] z-[0] mx-auto w-full px-6">
        {/* <button onClick={() => console.log(sessionsData)}>
          Get history data
        </button> */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              className="border border-gray-200 bg-white mt-2 p-[20px] mx-auto rounded-3xl"
            >
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          ))
        ) : (
          <WorkoutSessionsList
            sessionsData={filteredSessionsData}
            deleteUserSession={deleteUserSession}
            getUserSessions={getUserSessions}
          />
        )}
      </div>

    </>
  )
}
