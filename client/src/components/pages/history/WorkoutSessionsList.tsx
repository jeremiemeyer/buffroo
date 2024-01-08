//@ts-nocheck
import { Link } from "react-router-dom"
import WorkoutSessionCard from "@/components/pages/history/WorkoutSessionCard"

export default function WorkoutSessionsList({
  sessionsData,
  deleteUserSession,
  getUserSessions,
}) {
  return (
    <>
      <div className="space-y-2">
        {sessionsData && sessionsData.length > 0 ? (
          sessionsData.map((session, index) => (
            <WorkoutSessionCard
              key={index}
              sessionData={sessionsData[index]}
              deleteUserSession={deleteUserSession}
              getUserSessions={getUserSessions}
            />
          ))
        ) : (
          <p className="text-xl">
            Your workout history is empty. 😥 <br /> Go ahead and{" "}
            <Link to="/">
              <span className="text-gray-500  underline decoration-gray-300">
                start a workout session
              </span>
            </Link>
            ! 💪
          </p>
        )}
      </div>
    </>
  )
}
