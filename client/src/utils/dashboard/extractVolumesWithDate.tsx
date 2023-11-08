//@ts-nocheck
import calculateVolume from "../calculateVolume"

export function extractVolumesWithDate({ sessionsData, selectedExerciseId }) {
  const volumes = []

  for (const session of sessionsData) {
    for (const exercise of session.exercises) {
      if (exercise.exerciseId === selectedExerciseId) {
        const volume = calculateVolume(exercise.sets)
        const date = new Date(session.startdate)
        const formattedDate = `${padZero(date.getDate())}/${padZero(
          date.getMonth() + 1
        )}`

        volumes.push({
          date: formattedDate,
          volume,
        })
        break
      }
    }
  }

    // Sort the volume array by date in ascending order (least recent to most recent)
    volumes.sort((a, b) => {
      // Parse the dates in "DD/MM" format
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return dateA.localeCompare(dateB);
    });

  return volumes
}

function padZero(value) {
  return String(value).padStart(2, "0")
}
