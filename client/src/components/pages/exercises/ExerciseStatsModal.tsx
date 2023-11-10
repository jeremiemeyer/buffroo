//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
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
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import useUserData from "@/hooks/api/useUserData"
import useSessions from "@/hooks/api/useSessions"
import { ExerciseBestSetLineChart } from "../profile/dashboard/charts/ExerciseBestSetLineChart"
import { ExerciseVolumesLineChart } from "../profile/dashboard/charts/ExerciseVolumeLineChart"

export default function ExerciseStatsModal({
  onClose,
  selectedExerciseId,
  exerciseData,
}) {
  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const [thisExerciseData, setThisExerciseData] = useState(exerciseData)
  const axiosPrivate = useAxiosPrivate()
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)
  const { sessionsData } = useSessions()

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 w-[600px] h-[500px]"
        >
          <div className="flex flex-row justify-between items-center text-center">
            <h1 className="text-3xl text-center px-5 dark:text-white dark:text-opacity-90">
              {thisExerciseData["name"]}
            </h1>
            <Button onClick={onClose} variant="destructive">
              X
            </Button>
          </div>

          <div className="pt-4">
            {/* <p>{exerciseData["bodypart"]}</p>
            <p>{exerciseData["category"]}</p> */}

            <Tabs position="relative" variant="unstyled">
              <TabList>
                {/* <Tab>History</Tab> */}
                <Tab className="dark:text-white dark:text-opacity-90">Best set</Tab>
                <Tab className="dark:text-white dark:text-opacity-90">Volume</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <ExerciseBestSetLineChart sessionsData={sessionsData} selectedExerciseId={selectedExerciseId}/>
                </TabPanel>
                <TabPanel>
                  <ExerciseVolumesLineChart sessionsData={sessionsData} selectedExerciseId={selectedExerciseId} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
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
