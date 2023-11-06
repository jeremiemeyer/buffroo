//@ts-nocheck
import Title from "@/components/layout/Title"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import WorkoutModal from "@/components/workout/WorkoutModal"
import { Box, SkeletonText } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import WorkoutStatusContext from "@/context/WorkoutStatusProvider"
import WorkoutDataContext from "@/context/WorkoutDataProvider"
import WorkoutTimerContext from "@/context/WorkoutTimerProvider"
import TemplateCard from "@/components/pages/home/templates/TemplateCard"
import CreateEditTemplateModal from "@/components/pages/home/templates/CreateEditTemplateModal"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import ConfirmDeleteTemplateModal from "@/components/pages/home/templates/ConfirmDeleteTemplateModal"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useWorkoutData from "@/hooks/useWorkoutData"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"
import useToast from "@/hooks/useToast"
import useTemplates from "@/hooks/api/useTemplates"
import formatDate from "@/utils/formatDate"

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
  const [filteredUserTemplates, setFilteredUserTemplates] =
    useState()

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

  useEffect(() => {
    getUserTemplates()
  }, [])

  return (
    <>
      {/* Title */}
      <div className="fixed bg-glassmorphism2 top-0 left-0 w-screen z-[10]">
        <Title className="z-[500]">Start Workout</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[100px] z-[0] mx-auto w-full px-6  space-y-4">
        <div className="text-3xl  mt-8">Quick start</div>
        {/* <button onClick={() => console.log(workoutIsInProgress)}>
          console log workoutIsInProgress
        </button> */}

        <Button onClick={handleClick}>Start an empty workout</Button>

        <div className="pt-12 text-3xl  mt-12 mb-4">
          Start from template
        </div>
        {/* <button onClick={() => console.log(userTemplatesData)}>Consolelog templates data</button> */}
        <div className="space-y-5">
          <Button onClick={() => setShowCreateTemplateModal(true)}>
            Create new...
          </Button>

          {/* <button onClick={() => console.log(userTemplates)}>
            Console log user templates
          </button> */}
          <div className="space-y-2">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Box
                    key={index}
                    className="rounded-3xl border border-gray-200 bg-white pb-6 px-6 mx-auto p-8"
                  >
                    <SkeletonText
                      noOfLines={8}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </Box>
                ))
              : filteredUserTemplates.length > 0 && filteredUserTemplates.map((template, index) => (
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
