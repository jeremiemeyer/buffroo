//@ts-nocheck
import Title from "@/components/layout/Title"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import WorkoutModal from "@/components/workout/WorkoutModal"
import {
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
  Box,
  SkeletonText,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import WorkoutStatusContext from "@/context/WorkoutStatusProvider"
import WorkoutDataContext from "@/context/WorkoutDataProvider"
import WorkoutTimerContext from "@/context/WorkoutStopwatchProvider"
import TemplateCard from "@/components/pages/home/templates/TemplateCard"
import CreateEditTemplateModal from "@/components/pages/home/templates/CreateEditTemplateModal"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import ConfirmDeleteTemplateModal from "@/components/pages/home/templates/ConfirmDeleteTemplateModal"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useWorkoutData from "@/hooks/useWorkoutData"
import useWorkoutTimer from "@/hooks/useWorkoutStopwatch"
import useToast from "@/hooks/useToast"
import useTemplates from "@/hooks/api/useTemplates"
import formatDate from "@/utils/formatDate"
import { AiOutlinePlus } from "react-icons/ai"

export default function Home() {
  const { workoutIsInProgress, setWorkoutIsInProgress } = useWorkoutStatus()
  const {
    workoutData,
    setWorkoutData,
    handleEditWorkoutNotes,
    handleEditWorkoutName,
    addExercise,
    resetWorkout,
  } = useWorkoutData()
  const { reset, start, pause } = useWorkoutTimer()
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const { workoutAdded, workoutAlreadyInProgress } = useToast()
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
      {/* Title */}
      <div className="fixed bg-glassmorphism2 top-0 left-0 w-screen z-[10]">
        <Title className="z-[500]">Start Workout</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[100px] z-[0] mx-auto w-full px-4">
        <div className="text-3xl mt-8 mb-4">Quick start</div>

        <Button onClick={handleClick} className="mb-16">Start an empty workout</Button>

        <div className="flex flex-row justify-between mx-auto">
          <h1 className="text-3xl font-semibold mb-4 px-4">Templates</h1>
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
                  <Box
                    key={index}
                    className="rounded-3xl border border-gray-200 bg-white pb-6 px-6 mx-auto p-8 w-full"
                  >
                    <SkeletonText
                      noOfLines={8}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </Box>
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
