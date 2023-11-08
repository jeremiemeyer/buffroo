//@ts-nocheck
export default function calculateVolume(exerciseSets) {
    if (!Array.isArray(exerciseSets) || exerciseSets.length === 0) {
      return "No data available"; // Return this message if exerciseSets is not an array or is empty
    }
  
    let volume = 0 // Initialize volume
  
    for (let i = 1; i < exerciseSets.length; i++) {
      const currentSet = exerciseSets[i];
      const currentSetVolume = currentSet.reps * currentSet.weight;
      volume = volume + currentSetVolume
    }
  
    return volume;
  }