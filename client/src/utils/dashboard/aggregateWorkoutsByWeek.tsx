//@ts-nocheck
import moment from "moment"

export function aggregateWorkoutsByWeek(usersessions) {
  const weekCounts = {} // Initialize an object to store week counts

  usersessions.forEach((session) => {
    const startDate = moment(session.startdate)
    const weekStartDate = startDate.startOf("week").format("DD/MM") // Format date as 'DD/MM'

    // Check if the weekStartDate exists in the weekCounts object
    if (weekCounts[weekStartDate]) {
      weekCounts[weekStartDate] += 1 // Increment the count for that week
    } else {
      weekCounts[weekStartDate] = 1 // Initialize the count for that week
    }
  })

  // Convert weekCounts object to an array of objects
  const aggregatedData = Object.keys(weekCounts).map((week) => ({
    week,
    workouts: weekCounts[week],
  }))

  // Sort the array by week in ascending order
  aggregatedData.sort((a, b) =>
    moment(a.week, "DD/MM").diff(moment(b.week, "DD/MM"))
  )

  return aggregatedData
}
