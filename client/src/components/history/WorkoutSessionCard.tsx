// @ts-nocheck
export default function WorkoutSessionCard({ sessionData }) {
  function formatISODate(isoDate) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }

    const formattedDate = new Date(isoDate).toLocaleString("en-US", options)
    return formattedDate
  }

  function calculateWorkoutDuration(startISODate, endISODate) {
    const startDate = new Date(startISODate)
    const endDate = new Date(endISODate)
    const durationInMilliseconds = endDate - startDate

    const hours = Math.floor(durationInMilliseconds / 3600000)
    const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000)

    let formattedDuration = ""

    if (hours > 0) {
      formattedDuration += `${hours}h`
    }

    if (minutes > 0 || formattedDuration === "") {
      formattedDuration += ` ${minutes}m`
    } else if (formattedDuration === "") {
      formattedDuration = "0m"
    }

    return formattedDuration.trim()
  }

  return (
    <div
      className={`border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left cursor-pointer mt-2 p-4`}
    >
      <p className="font-bold pb-2 text-xl">Workout Session</p>
      <div className="grid grid-cols-2">
        <p className="font-semibold">
          <i className="fa-regular fa-calendar mr-2" />
          {formatISODate(sessionData?.startdate)}
        </p>
        <p>
          <i className="fa-solid fa-clock mr-2" />
          {calculateWorkoutDuration(sessionData?.startdate, sessionData?.enddate)}
        </p>
      </div>

      {sessionData?.notes !== "" && (
        <p>
          <i className="fa fa-pen mr-2" /> {sessionData?.notes}
        </p>
      )}
      <div className="grid grid-cols-2 pt-4">
        <div className="font-semibold">Exercise</div>
        <div className="font-semibold">Sets</div>
      </div>
      {sessionData?.exercises.map((exercise) => (
        <div className="grid grid-cols-2">
          <div>
            {exercise.sets.length} x {exercise.name}
          </div>
          <div>
            {exercise.sets.map((set, setIndex) => (
              <span key={setIndex}>
                {set.reps}x{set.weight}kg
                {setIndex < exercise.sets.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
