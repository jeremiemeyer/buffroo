//@ts-nocheck
import WorkoutsPerWeek from "./WorkoutsPerWeek"

export default function Dashboard({ userData,  updateUserData }) {
  return (
    <>
      <WorkoutsPerWeek
        userData={userData}
        updateUserData={updateUserData}
      />
    </>
  )
}
