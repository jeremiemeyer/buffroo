const UserExercise = require("../../../models/UserExercise")

// get user exercises (custom exercises)
const getUserExercises = async (req, res) => {
  console.log("User ID: ", req.params.id)
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required." }) // 400 Bad Request

  const exercises = await UserExercise.find({ userId: req.params.id }).exec()

  if (!exercises || exercises.length === 0)
    return res.status(204).json({ message: "No exercises found." })
  res.json(exercises)
}

// create user exercise (custom exercise)
const createUserExercise = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required." }) // 400 Bad Request

  if (!req?.body?.name || !req?.body?.bodypart || !req?.body?.category) {
    return res
      .status(400)
      .json({ message: "Exercise name, bodypart and category required." })
  }

  try {
    const { name, bodypart, category } = req.body
    const userId = req.params.id
    const newUserExercise = await UserExercise.create({
      name: name,
      bodypart: bodypart,
      category: category,
      userId: userId,
    })
    res.status(201).json(newUserExercise) // 201 Created
  } catch (err) {
    console.error(err)
  }
}

const updateUserExercise = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.exerciseId)
    return res.status(400).json({ message: "User ID and exercise ID required." }) // 400 Bad Request

  const { userId, exerciseId } = req.params
  const { exerciseData } = req.body

  const updatedExercise = await UserExercise.findByIdAndUpdate(exerciseId, {
    name: exerciseData.name,
    bodypart: exerciseData.bodypart,
    category: exerciseData.category,
  }).exec()

  if (!updatedExercise)
    return res.status(500).json({ message: "Error updating user exercise." })
  res.json(updatedExercise)
}

module.exports = {
  getUserExercises,
  createUserExercise,
  updateUserExercise,
}
