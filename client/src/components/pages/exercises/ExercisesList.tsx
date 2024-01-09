//@ts-nocheck
import { useState } from "react"
import {
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import { createPortal } from "react-dom"
import ExerciseCard from "./ExerciseCard"
import ExerciseStatsModal from "@/components/pages/exercises/modals/ExerciseStatsModal"
import ExerciseEditModal from "@/components/pages/exercises/modals/ExerciseEditModal"
import SquircleTile from "@/components/ui/squircle-tile"

export default function ExercisesList({
  exercisesData,
  isLoading,
  getAllExercises,
}) {
  const [showExerciseStatsModal, setShowExerciseStatsModal] = useState(false)
  const [showExerciseEditModal, setShowExerciseEditModal] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState("")

  function onClickExerciseEdit() {
    setShowExerciseEditModal(true)
  }

  function onClickExerciseStats() {
    setShowExerciseStatsModal(true)
  }


  return (
    <>
      <div className="pt-[60px] pb-[80px] z-[0] mx-auto w-full px-4 space-y-2">

        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SquircleTile
              key={index}
            >
              <SkeletonText
                mt="4"
                noOfLines={3}
                spacing="4"
                skeletonHeight="2"
              />
            </SquircleTile>
          ))
        ) : (
          <>
            {exercisesData &&
              exercisesData.map((ex, index) => (
                <ExerciseCard
                  key={index}
                  index={index}
                  exerciseId={ex["_id"]}
                  name={ex["name"]}
                  category={ex["category"]}
                  bodypart={ex["bodypart"]}
                  selectedExeciseId={selectedExerciseId}
                  setSelectedExerciseId={setSelectedExerciseId}
                  onClickExerciseEdit={onClickExerciseEdit}
                  onClickExerciseStats={onClickExerciseStats}
                  isCustomUserExercise={ex.hasOwnProperty("userId")}
                />
              ))}
          </>
        )}
      </div>
      {showExerciseStatsModal &&
        createPortal(
          <ExerciseStatsModal
            onClose={() => setShowExerciseStatsModal(false)}
            selectedExerciseId={selectedExerciseId}
            exerciseData={exercisesData.find(
              (ex) => ex._id === selectedExerciseId
            )}
          />,
          document.body
        )}

      {showExerciseEditModal &&
        createPortal(
          <ExerciseEditModal
            onClose={() => setShowExerciseEditModal(false)}
            selectedExerciseId={selectedExerciseId}
            exerciseData={exercisesData.find(
              (ex) => ex._id === selectedExerciseId
            )}
            getAllExercises={getAllExercises}
          />,
          document.body
        )}
    </>
  )
}
