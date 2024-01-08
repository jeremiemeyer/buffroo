//@ts-nocheck
import { useState, useEffect } from "react"
import {
  Select,
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import useSessions from "@/hooks/api/useSessions"
import WorkoutSessionsList from "@/components/pages/history/WorkoutSessionsList"
import ReactPaginate from "react-paginate"

import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"

export default function History() {
  const {
    sessionsData,
    isLoading,
    deleteUserSession,
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
    if (sessionsData.length > 0) {
      setSortedSessionsData(
        sessionsData.slice().sort((a, b) => {
          const dateA = new Date(a.startdate)
          const dateB = new Date(b.startdate)
          return dateB - dateA // Sort in descending order (newest to oldest)
        })
      )
    }
  }, [sessionsData])

  useEffect(() => {
    if (sessionsData.length > 0 && sortedBy === "newest") {
      setSortedSessionsData(
        sessionsData.slice().sort((a, b) => {
          const dateA = new Date(a.startdate)
          const dateB = new Date(b.startdate)
          return dateB - dateA // Sort in descending order (newest to oldest)
        })
      )
    }
    if (sessionsData.length > 0 && sortedBy === "oldest") {
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


  return (
    <>
      {/* Content */}
      <div className="pt-[80px] pb-[80px] z-[0] mx-auto w-full px-4">
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
            {sessionsData.length > 0 && (
              <>
                <div className="justify-between flex flex-col md:flex-row items-center px-4">
                  <p className="pb-2 md:pb-0 dark:text-white dark:text-opacity-70">
                    {pageNumber === pageCount - 1
                      ? `Showing results ${itemsShown}-${sessionsData.length} out of ${sessionsData.length}.`
                      : `Showing results ${itemsShown}-${
                          itemsShown + sessionsPerPage
                        } out of ${sessionsData.length}.`}
                  </p>
                  <div className="w-[300px] flex flex-row flex-nowrap items-center">
                    <p className="whitespace-nowrap mr-4 dark:text-white dark:text-opacity-90">
                      Sort by
                    </p>
                    <div className="flex grow">
                      <Select
                        value={sortedBy}
                        onChange={(e) => setSortedBy(e.target.value)}
                        className="bg-white dark:bg-gray-600 dark:border-gray-600"
                      >
                        <option value="newest">Newest to oldest</option>
                        <option value="oldest">Oldest to newest</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <ReactPaginate
                  previousLabel={<IoIosArrowBack />}
                  nextLabel={<IoIosArrowForward />}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName="flex justify-center items-center mt-4 mb-4 gap-2"
                  previousLinkClassName="font-semibold opacity-40"
                  nextLinkClassName="font-semibold opacity-40"
                  activeClassName="text-white bg-blue-600 hover:bg-blue-800"
                  pageClassName="text-black rounded-full p-2 px-4 dark:text-white"
                />
              </>
            )}

            <WorkoutSessionsList
              sessionsData={displaySessions}
              deleteUserSession={deleteUserSession}
            />
            {sessionsData.length > 0 && (
              <button
                onClick={goTop}
                className="py-4 font-semibold text-blue-600"
              >
                Back to top
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}
