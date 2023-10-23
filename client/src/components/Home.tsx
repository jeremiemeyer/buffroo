import Title from "./layout/Title"
import { Button } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import WorkoutModal from "./modals/Workout/WorkoutModal"
import { useState } from "react"

export default function Home() {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)

  return (
    <>
      <div className="fixed px-6 fixed top-0 left-0 bg-white w-screen">
        <Title className="z-[500]">Start Workout</Title>
      </div>
      <div className="pt-[80px] pb-[100px] z-[0]">
        <div className="text-xl font-semibold mt-8">Quick start</div>
        <Button
          onClick={() => setShowWorkoutModal(true)}
          colorScheme="blue"
          className="mt-4"
        >
          Start an empty workout
        </Button>

        <div className="text-xl font-semibold mt-12">Templates</div>
      </div>
      {showWorkoutModal &&
        createPortal(
          <WorkoutModal onClose={() => setShowWorkoutModal(false)} />,
          document.body
        )}
    </>
  )
}
