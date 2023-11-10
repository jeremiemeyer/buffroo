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
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

import { SearchIcon } from "@chakra-ui/icons"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"
import { createPortal } from "react-dom"
import EditWorkoutModal from "../components/pages/history/EditWorkoutModal"
import useToast from "../hooks/useToast"
import { Button } from "@/components/ui/button"
import useSessions from "@/hooks/api/useSessions"
import WorkoutSessionsList from "@/components/pages/history/WorkoutSessionsList"
import ReactPaginate from "react-paginate"
import useTheme from "@/hooks/useTheme"


export default function History() {
  const axiosPrivate = useAxiosPrivate()
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("")
  const { workoutDeleted } = useToast()
  const { auth } = useAuth()
  const { theme } = useTheme()
  const {
    sessionsData,
    isLoading,
    getUserSessions,
    deleteUserSession,
    createUserSession,
  } = useSessions()

  const goTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  // Sorting
  const [sortedSessionsData, setSortedSessionsData] = useState(sessionsData)
  const [sortedBy, setSortedBy] = useState("newest")

  useEffect(() => {
    setSortedSessionsData(
      sessionsData.slice().sort((a, b) => {
        const dateA = new Date(a.startdate)
        const dateB = new Date(b.startdate)
        return dateB - dateA // Sort in descending order (newest to oldest)
      })
    )
  }, [sessionsData])

  useEffect(() => {
    if (sortedBy === "newest") {
      setSortedSessionsData(
        sessionsData.slice().sort((a, b) => {
          const dateA = new Date(a.startdate)
          const dateB = new Date(b.startdate)
          return dateB - dateA // Sort in descending order (newest to oldest)
        })
      )
    }
    if (sortedBy === "oldest") {
      setSortedSessionsData(
        sessionsData.slice().sort((a, b) => {
          const dateA = new Date(a.startdate)
          const dateB = new Date(b.startdate)
          return dateA - dateB // Sort in ascending order (oldest to newest)
        })
      )
    }
  }, [sortedBy, sessionsData])

  // Pagination
  const [pageNumber, setPageNumber] = useState(0)
  const sessionsPerPage = 15
  const itemsShown = pageNumber * sessionsPerPage
  const displaySessions = sortedSessionsData.slice(
    itemsShown,
    itemsShown + sessionsPerPage
  )
  const pageCount = Math.ceil(sortedSessionsData.length / sessionsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
    goTop()
  }

  function onClickExerciseCard(exerciseId) {
    setSelectedExerciseId(exerciseId)
    setShowExerciseDetailsModal(true)
  }

  return (
    <>
      {/* Title  */}
      <div className="px-6 bg-glassmorphism2 bg-white bg-opacity-70 dark:bg-gray-800 dark:border-gray-800  dark:bg-opacity-30 fixed top-0 left-0 w-full z-[10]">
        <Title className="h-[10%] z-[500]">History</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[80px] z-[0] mx-auto w-full px-4">
        {/* <button onClick={() => console.log(sessionsData)}>
          Get history data
        </button> */}

        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-2 p-[20px] mx-auto rounded-3xl"
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
          <>
            <div className="justify-between flex flex-col md:flex-row items-center px-4">
              <p className="pb-2 md:pb-0 dark:text-white dark:text-opacity-70">
                {pageNumber === pageCount - 1
                  ? `Showing results ${itemsShown}-${sessionsData.length} out of ${sessionsData.length}.`
                  : `Showing results ${itemsShown}-${
                      itemsShown + sessionsPerPage
                    } out of ${sessionsData.length}.`}
              </p>
              {/* {pageNumber === pageCount - 1
                  ? sessionsData.length - itemsShown
                  : sessionsPerPage}{" "} */}
              <div className="w-[300px] flex flex-row flex-nowrap items-center">
                <p className="whitespace-nowrap mr-4 dark:text-white dark:text-opacity-90">Sort by</p>
                <div className="flex grow">
                  <Select
                    value={sortedBy}
                    onChange={(e) => setSortedBy(e.target.value)}
                    className="bg-white dark:bg-gray-600 dark:border-gray-600"
                    bg={theme==="dark" ?  "" : "white"}
                    color={theme==="dark" ? "white" : ""}
                    sx={theme==="dark" ? {
                      "> option": {
                        background: "black",
                        color: "white",
                      },
                    } : ""}
                  >
                    <option value="newest">Newest to oldest</option>
                    <option value="oldest">Oldest to newest</option>
                  </Select>
                </div>
              </div>
            </div>

            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="flex flex-row justify-center  gap-1 items-center mt-4"
              previousLinkClassName="font-semibold opacity-40 mr-2"
              nextLinkClassName="font-semibold opacity-40 ml-2"
              activeClassName="text-white bg-blue-600 hover:bg-blue-800"
              pageClassName="text-black rounded-full p-2 px-4 dark:text-white"
            />

            <WorkoutSessionsList
              sessionsData={displaySessions}
              deleteUserSession={deleteUserSession}
            />

            <button
              onClick={goTop}
              className="py-4 font-semibold text-blue-600"
            >
              Back to top
            </button>
          </>
        )}
      </div>
    </>
  )
}
