//@ts-nocheck
import ExerciseProgress from "./ExerciseProgress"
import WorkoutsPerWeek from "./WorkoutsPerWeek"

export default function Dashboard({ userData, updateUserData }) {
  return (
    <>
      <div className="space-y-2">
        <WorkoutsPerWeek userData={userData} updateUserData={updateUserData} />
        <ExerciseProgress />
      </div>
    </>
  )
}
