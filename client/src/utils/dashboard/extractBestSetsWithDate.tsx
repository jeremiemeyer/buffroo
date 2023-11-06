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

        const reps = parseInt(bestSet.split('x')[0].trim());
        const weight = parseFloat(bestSet.split('x')[1].trim().replace('kg', ''));
        const product = reps * weight;

        bestSets.push({
          date: formattedDate,
          bestSet,
          weight,
        })
        break // Move to the next session
      }
    }
  }

  return bestSets
}

function padZero(value) {
  return String(value).padStart(2, "0")
}
