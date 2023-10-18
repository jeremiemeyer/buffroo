import Title from "../components/layout/Title"
import {
  Button,
} from "@chakra-ui/react"
import { createPortal } from "react-dom"
import { useState } from "react"
import WorkoutModal from "../components/modals/Workout/WorkoutModal"

export default function Root() {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  return (
    <>
      <div className="p-6 pt-[100px]">
        <Title>Start Workout</Title>
        <div className="text-xl font-semibold mt-8">Quick start</div>
        <Button onClick={() => setShowWorkoutModal(true)} colorScheme="blue" className="mt-4">
          Start an empty workout
        </Button>

        <div className="text-xl font-semibold mt-12">Templates</div>
      </div>
      {showWorkoutModal && createPortal(<WorkoutModal onClose={() => setShowWorkoutModal(false)}/>, document.body)}
    </>
  )
}
