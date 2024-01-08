//@ts-nocheck
import { useState } from "react"
import {
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
import useSessions from "@/hooks/api/useSessions"
import { ExerciseBestSetLineChart } from "@/components/pages/dashboard/dashboard/charts/ExerciseBestSetLineChart"
import { ExerciseVolumesLineChart } from "@/components/pages/dashboard/dashboard/charts/ExerciseVolumeLineChart"
import ModalTemplate from "@/components/ModalTemplate"

export default function ExerciseStatsModal({
  onClose,
  selectedExerciseId,
  exerciseData,
}) {
  const [thisExerciseData, setThisExerciseData] = useState(exerciseData)
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)
  const { sessionsData } = useSessions()

  return (
    <>
      <ModalTemplate onClose={onClose}>
        <div className="flex flex-row justify-between items-center text-center">
          <h1 className="text-3xl text-center px-5 dark:text-white dark:text-opacity-90">
            {thisExerciseData["name"]}
          </h1>
          <Button onClick={onClose} variant="destructive">
            X
          </Button>
        </div>

        <div className="pt-4">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab className="dark:text-white dark:text-opacity-90">
                Best set
              </Tab>
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
                <ExerciseBestSetLineChart
                  sessionsData={sessionsData}
                  selectedExerciseId={selectedExerciseId}
                />
              </TabPanel>
              <TabPanel>
                <ExerciseVolumesLineChart
                  sessionsData={sessionsData}
                  selectedExerciseId={selectedExerciseId}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </ModalTemplate>
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
