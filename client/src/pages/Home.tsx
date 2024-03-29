//@ts-nocheck
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import {
  Button as ChakraButton,
  Icon,
  Box,
  SkeletonText,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import TemplateCard from "@/components/pages/home/templates/TemplateCard"
import CreateEditTemplateModal from "@/components/pages/home/templates/modals/CreateEditTemplateModal"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useWorkoutData from "@/hooks/useWorkoutData"
import useWorkoutTimer from "@/hooks/useWorkoutStopwatch"
import useToast from "@/hooks/useToast"
import useTemplates from "@/hooks/api/useTemplates"
import formatDate from "@/utils/formatDate"
import { AiOutlinePlus } from "react-icons/ai"
import SquircleTile from "@/components/ui/squircle-tile"

export default function Home() {
  const { workoutIsInProgress, setWorkoutIsInProgress } = useWorkoutStatus()
  const {
    setWorkoutData,
  } = useWorkoutData()
  const { start } = useWorkoutTimer()
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false)
  const { workoutAlreadyInProgress } = useToast()
  const { userTemplatesData, isLoading, getUserTemplates } = useTemplates()
  const [filteredUserTemplates, setFilteredUserTemplates] = useState()

  useEffect(() => {
    setFilteredUserTemplates(userTemplatesData)
  }, [userTemplatesData])

  // start empty workout
  function handleClick() {
    if (workoutIsInProgress) {
      workoutAlreadyInProgress() // toast
    } else {
      setWorkoutIsInProgress(true)
      start() // stopwatch start
      const startDate = new Date().toISOString()
      setWorkoutData({
        name: `${formatDate(startDate)} Workout`,
        startdate: startDate,
        enddate: "",
        exercises: [],
        notes: "",
      })
    }
  }

  function startWorkoutFromTemplate(templateData) {
    if (workoutIsInProgress) {
      workoutAlreadyInProgress()
    } else {
      setWorkoutIsInProgress(true)
      start() // stopwatch start
      const startDate = new Date().toISOString()
      setWorkoutData({ ...templateData, startdate: startDate, enddate: "" })
    }
  }

  return (
    <>
      {/* Content */}
      <div className="pt-[80px] pb-[100px] z-[0] mx-auto w-full px-4">
        <div className="text-3xl mt-8 mb-4 dark:text-white dark:text-opacity-90">Quick start</div>

        <Button onClick={handleClick} className="mb-16">Start an empty workout</Button>

        <div className="flex flex-row justify-between mx-auto">
          <h1 className="text-3xl font-semibold mb-4 px-4 dark:text-white dark:text-opacity-90">Templates</h1>
          <div>
            <ChakraButton
              onClick={() => setShowCreateTemplateModal(true)}
              leftIcon={<Icon as={AiOutlinePlus} />}
              textColor="rgba(14,165,233,1)" //sky-500
              bg={"rgba(186,230,253,0.4)"}
              _hover={{ bg: "rgba(186,230,253,0.8)" }}
            >
              Template
            </ChakraButton>
          </div>
        </div>
        <div className="space-y-5">
          <div className="gap-2 grid grid-cols-2 mx-auto">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SquircleTile
                    key={index}
                  >
                    <SkeletonText
                      noOfLines={8}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </SquircleTile>
                ))
              : filteredUserTemplates.length > 0 &&
                filteredUserTemplates.map((template, index) => (
                  <TemplateCard
                    key={index}
                    templateData={filteredUserTemplates[index]}
                    setShowConfirmDeleteTemplate={() =>
                      setShowConfirmDeleteTemplate(true)
                    }
                    getUserTemplates={getUserTemplates}
                    startWorkoutFromTemplate={startWorkoutFromTemplate}
                  />
                ))}
          </div>
        </div>
      </div>
      {showCreateTemplateModal &&
        createPortal(
          <CreateEditTemplateModal
            actionType="create"
            onClose={() => setShowCreateTemplateModal(false)}
            thisTemplateData={{
              name: "New template",
              startdate: "",
              enddate: "",
              exercises: [],
              notes: "",
            }}
          />,
          document.body
        )}
    </>
  )
}
