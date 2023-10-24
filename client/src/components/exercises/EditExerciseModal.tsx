//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { Button, Input, Select, Tab, Tabs, TabList, TabIndicator, TabPanels, TabPanel  } from "@chakra-ui/react"

export default function EditExerciseModal({ onClose, selectedExerciseId }) {
  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const [exerciseData, setExerciseData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()

  const getExerciseData = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(EXERCISE_DATA_URL)
      const exerciseData = response.data
      console.log(exerciseData)
      setExerciseData(exerciseData)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  useEffect(() => {
    getExerciseData({ selectedExerciseId })
  }, [])


  return (
    <div
      onClick={onClose}
      className="fixed z-[800] inset-0 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-100 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
      >
        <div className="flex flex-row justify-between items-center text-center">
          <Button
            onClick={onClose}
            colorScheme="red"
          >
            X
          </Button>
          <h1 className="font-semibold text-2xl text-center px-5">
            {exerciseData["name"]}
          </h1>
          <Button
            // onClick={handleSave}
            colorScheme="blue"
          >
            Edit
          </Button>
        </div>
        {!isLoading && (
          <div className="pt-4">
            <p>{exerciseData["bodypart"]}</p>
            <p>{exerciseData["category"]}</p>

          </div>
        )}
      </div>
    </div>
  )
}
