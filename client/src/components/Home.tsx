//@ts-nocheck
import Title from "./layout/Title"
import { Button } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import WorkoutModal from "./workout/WorkoutModal"
import { useState, useEffect } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import WorkoutDataContext from "../context/WorkoutDataProvider"
import WorkoutTimerContext from "../context/WorkoutTimerProvider"
import TemplateCard from "./home/templates/TemplateCard"
import CreateEditTemplateModal from "./home/templates/CreateEditTemplateModal"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import ConfirmDeleteTemplateModal from "./home/templates/ConfirmDeleteTemplateModal"
import useWorkoutStatus from "../hooks/useWorkoutStatus"
import useWorkoutData from "../hooks/useWorkoutData"
import useWorkoutTimer from "../hooks/useWorkoutTimer"
import useToast from "../hooks/useToast"

function formatDate(inputDate) {
  const date = new Date(inputDate)
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const dayOfWeek = days[date.getDay()]
  const hour = date.getHours()
  let timeOfDay
  if (hour >= 5 && hour < 12) {
    timeOfDay = "Morning"
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = "Afternoon"
  } else if (hour >= 17 && hour < 20) {
    timeOfDay = "Evening"
  } else {
    timeOfDay = "Night"
  }
  const formattedDate = `${dayOfWeek} ${timeOfDay}`
  return formattedDate
}

export default function Home() {
  const { workoutIsInProgress, setWorkoutIsInProgress } =
    useWorkoutStatus()
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
  const [userTemplates, setUserTemplates] = useState([])
  const TEMPLATES_URL = `/api/users/${auth.userId}/templates`
  const [isLoading, setIsLoading] = useState(false)
  const { workoutAdded } = useToast()

  const getUserTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(TEMPLATES_URL, {
        withCredentials: true,
      })
      // isMounted &&
      setUserTemplates(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // start empty workout
  function handleClick() {
    if (workoutIsInProgress) {
      alert("A workout is already in progress!")
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
      alert("A workout is already in progress!")
    } else {
      setWorkoutIsInProgress(true)
      start() // stopwatch start
      const startDate = new Date().toISOString()
      setWorkoutData({ ...templateData, startdate: startDate, enddate: "" })
    }
  }

  const deleteTemplate = async (templateId) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/users/${auth.userId}/templates/${templateId}`,
        {
          withCredentials: true,
        }
      )
      if (response.status === 200) {
        // Call the callback function to update the workout history
        getUserTemplates()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
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
      <div className="pt-[80px] pb-[100px] z-[0] mx-auto w-full px-6">
        <div className="text-3xl font-light mt-8">Quick start</div>
        {/* <button onClick={() => console.log(workoutIsInProgress)}>
          console log workoutIsInProgress
        </button> */}

        <Button
          onClick={handleClick}
          colorScheme="blue"
          className="mt-4"
          borderRadius="16px"
          fontWeight={"400"}
        >
          Start an empty workout
        </Button>

        <div className="text-3xl font-light mt-12 mb-4">
          Start from template
        </div>
        <div className="space-y-5">
          <Button
            borderRadius={"16px"}
            variant="outline"
            colorScheme="blue"
            onClick={() => setShowCreateTemplateModal(true)}
          >
            Create new...
          </Button>

          {/* <button onClick={() => console.log(userTemplates)}>
            Console log user templates
          </button> */}
          <div className="space-y-2">
            {userTemplates && userTemplates.length > 0 && userTemplates.map((template, index) => (
              <TemplateCard
                key={index}
                templateData={userTemplates[index]}
                setShowConfirmDeleteTemplate={() =>
                  setShowConfirmDeleteTemplate(true)
                }
                deleteTemplate={deleteTemplate}
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
            getUserTemplates={getUserTemplates}
          />,
          document.body
        )}
        
    </>
  )
}
