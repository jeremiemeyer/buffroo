//@ts-nocheck
import Title from "./layout/Title"
import { Button } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import WorkoutModal from "./workout/WorkoutModal"
import { useState, useContext } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import WorkoutDataContext from "../context/WorkoutDataProvider"
import WorkoutTimerContext from "../context/WorkoutTimerProvider"

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
    useContext(WorkoutStatusContext)
  const {
    workoutData,
    setWorkoutData,
    handleEditWorkoutNotes,
    handleEditWorkoutName,
    addExercise,
    resetWorkout,
  } = useContext(WorkoutDataContext)
  const { reset, start, pause } = useContext(WorkoutTimerContext)

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

  return (
    <>
      {/* Title */}
      <div className="fixed bg-glassmorphism2 top-0 left-0 w-screen z-[10]">
        <Title className="z-[500]">Start Workout</Title>
      </div>

      {/* Content */}
      <div className="pt-[80px] pb-[100px] z-[0] mx-auto max-w-[1200px] px-6">
        <div className="text-2xl font-light mt-8">Quick start</div>
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

        <div className="text-2xl font-light mt-12">Templates</div>
      </div>
    </>
  )
}
