export default function calculateBestSet(exerciseSets) {
    if (!Array.isArray(exerciseSets) || exerciseSets.length === 0) {
      return "No data available"; // Return this message if exerciseSets is not an array or is empty
    }
  
    let bestSet = exerciseSets[0]; // Initialize bestSet with the first set
    let maxProduct = bestSet.reps * bestSet.weight;
  
    for (let i = 1; i < exerciseSets.length; i++) {
      const currentSet = exerciseSets[i];
      const product = currentSet.reps * currentSet.weight;
  
      if (product > maxProduct) {
        bestSet = currentSet;
        maxProduct = product;
      }
    }
  
    return `${bestSet.reps} x ${bestSet.weight} kg`;
  }