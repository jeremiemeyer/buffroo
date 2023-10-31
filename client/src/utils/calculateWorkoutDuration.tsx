//@ts-nocheck
export default function calculateWorkoutDuration(
  startISODate: string,
  endISODate: string
) {
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
