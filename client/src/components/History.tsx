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

const HISTORY_URL = "/api/sessions"

export default function History() {
  const [historyData, setHistoryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()

  const getWorkoutHistory = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(HISTORY_URL, {
        withCredentials: true,
      })
      isMounted && setHistoryData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {

    getWorkoutHistory()

  }, [])

  return (
    <>
      <div className="fixed bg-white w-screen">
        <Title className="h-[10%] z-[500]">History</Title>
      </div>
      <div className="pt-[80px] pb-[100px] z-[0]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <>
              <Box className="border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left cursor-pointer mt-2 w-[calc(100%-40px)] p-[20px] mx-auto">
                <SkeletonText noOfLines={1} skeletonHeight="10" />
                <SkeletonText noOfLines={2} skeletonHeight="6" />
                <SkeletonText noOfLines={3} skeletonHeight="6" />
              </Box>
            </>
          ))
        ) : (
          <>
            {historyData.map((session, index) => (
              <WorkoutSessionCard
                key={index}
                sessionData={historyData[index]}
              />
            ))}
          </>
        )}
      </div>

      {/* <button onClick={() => console.log(historyData[0])}>ok</button> */}
    </>
  )
}
