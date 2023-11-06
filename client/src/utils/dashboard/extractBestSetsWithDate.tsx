//@ts-nocheck
import calculateBestSet from "../calculateBestSet"

export function extractBestSetsWithDate({ sessionsData, selectedExerciseId }) {
  const bestSets = []

  for (const session of sessionsData) {
    for (const exercise of session.exercises) {
      if (exercise.exerciseId === selectedExerciseId) {
        const bestSet = calculateBestSet(exercise.sets)
        const date = new Date(session.startdate)
        const formattedDate = `${padZero(date.getDate())}/${padZero(
          date.getMonth() + 1
        )}`

        const reps = parseInt(bestSet.split("x")[0].trim())
        const weight = parseFloat(
          bestSet.split("x")[1].trim().replace("kg", "")
        )
        const product = reps * weight

        bestSets.push({
          date: formattedDate,
          bestSet,
          weight,
        })
        break
      }
    }
  }

    // Sort the bestSets array by date in ascending order (least recent to most recent)
    bestSets.sort((a, b) => {
      // Parse the dates in "DD/MM" format
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return dateA.localeCompare(dateB);
    });

  return bestSets
}

function padZero(value) {
  return String(value).padStart(2, "0")
}
