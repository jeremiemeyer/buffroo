export default function formatDate(inputDate: string) {
    const date = new Date(inputDate)
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const dayOfWeek = days[date.getDay()]
    const hour = date.getHours()
    let timeOfDay
    if (hour >= 5 && hour < 12) {
      timeOfDay = "Morning"
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = "Afternoon"
    } else if (hour >= 17 && hour < 20) {
      timeOfDay = "Evening"
    } else {
      timeOfDay = "Night"
    }
    const formattedDate = `${dayOfWeek} ${timeOfDay}`
    return formattedDate
  }