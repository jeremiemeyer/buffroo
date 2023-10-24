const Exercise = require("../../models/Exercise")
const UserExercise = require("../../models/UserExercise")

// get default app exercises
const getExercises = async (req, res) => {
  const exercises = await Exercise.find()
  if (!exercises)
    return res.status(204).json({ message: "No exercises found." })
  res.json(exercises)
}
const getExerciseData = async (req, res) => {
  if (!req?.params?.exerciseId) {
    return res.status(400).json({ message: "Exercise ID required." }) // 400 Bad Request
  }

  try {
    // Try to find the exercise in the Exercise model
    const exerciseData = await Exercise.find({
      _id: req.params.exerciseId,
    }).exec()

    if (exerciseData && exerciseData.length > 0) {
      // Exercise found in the Exercise model
      return res.json(exerciseData[0])
    }

    // If exercise was not found in the Exercise model, try the UserExercise model
    const userExerciseData = await UserExercise.find({
      _id: req.params.exerciseId,
    }).exec()

    if (userExerciseData && userExerciseData.length > 0) {
      // Exercise found in the UserExercise model
      return res.json(userExerciseData[0])
    }

    return res.status(204).json({ message: "No exercises found." })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = {
  getExercises,
  getExerciseData,
}
