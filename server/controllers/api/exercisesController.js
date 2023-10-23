const Exercise = require('../../models/Exercise')

// get default app exercises
const getExercises = async (req, res) => {
  const exercises = await Exercise.find()
  if (!exercises) return res.status(204).json({'message': 'No exercises found.'})
  res.json(exercises)
}

module.exports = {
  getExercises,
}