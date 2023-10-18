import Title from "../components/layout/Title"
import { Button } from "@chakra-ui/react"
import { createPortal } from "react-dom"
import { useState } from "react"
import WorkoutModal from "../components/modals/Workout/WorkoutModal"

export default function Root() {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  return (
    <>
      <div className="fixed bg-white w-screen">
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
