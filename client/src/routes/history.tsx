//@ts-nocheck
import WorkoutSessionCard from "../components/history/WorkoutSessionCard"
import Title from "../components/layout/Title"
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
import axios from "axios"

export default function History() {
  const [historyData, setHistoryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getWorkoutHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/history")
      setHistoryData(response.data)
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
      <div className="px-6 pt-[100px] h-[100%]">
        <Title className="h-[10%]">History</Title>
        <div className="h-[90%] w-[100%] overflow-auto pt-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <>
                <Box className="border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left cursor-pointer mt-2 p-4">
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
      </div>
    </>
  )
}
