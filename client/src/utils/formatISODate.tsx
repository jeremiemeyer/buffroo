//@ts-nocheck
export default function formatISODate(isoDate: string) {
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
