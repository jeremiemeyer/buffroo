//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import {
  Input,
  Select,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import EditExerciseModal from "./ExerciseEditModal"

export default function ExerciseStatsModal({ onClose, selectedExerciseId }) {
  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const [exerciseData, setExerciseData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)

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
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-100 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="flex flex-row justify-between items-center text-center">
            <h1 className="text-3xl text-center px-5">
              {exerciseData["name"]}
            </h1>
            <Button onClick={onClose} variant="destructive">
              X
            </Button>
          </div>
          {!isLoading && (
            <div className="pt-4">
              {/* <p>{exerciseData["bodypart"]}</p>
            <p>{exerciseData["category"]}</p> */}

              <Tabs position="relative" variant="unstyled">
                <TabList>
                  <Tab>History</Tab>
                  <Tab>Charts</Tab>
                  <Tab>Records</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <p>Feature in development.</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Feature in development.</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Feature in development.</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          )}
        </div>
      </div>
      {showEditExerciseModal &&
        createPortal(
          <EditExerciseModal
            onClose={() => setShowEditExerciseModal(false)}
            selectedExerciseId={selectedExerciseId}
          />,
          document.body
        )}
    </>
  )
}
