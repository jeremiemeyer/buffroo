//@ts-nocheck
import Title from "./layout/Title"
import { Button } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import WorkoutModal from "./modals/Workout/WorkoutModal"
import { useState, useContext } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"

export default function Home() {
  const { workoutIsInProgress, setWorkoutIsInProgress } =
    useContext(WorkoutStatusContext)

  function handleClick() {
    workoutIsInProgress
      ? alert("A workout is already in progress!")
      : setWorkoutIsInProgress(true)
  }

  return (
    <>
      <div className="fixed bg-gray-200 top-0 left-0 w-screen">
        <Title className="z-[500]">Start Workout</Title>
      </div>
      <div className="pt-[80px] pb-[100px] z-[0]">
        <div className="text-xl font-semibold mt-8">Quick start</div>
        {/* <button onClick={() => console.log(workoutIsInProgress)}>
          console log workoutIsInProgress
        </button> */}

        <Button onClick={handleClick} colorScheme="blue" className="mt-4">
          Start an empty workout
        </Button>

        <div className="text-xl font-semibold mt-12">Templates</div>
      </div>
    </>
  )
}
