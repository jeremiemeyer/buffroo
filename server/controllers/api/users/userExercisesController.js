const UserExercise = require("../../../models/UserExercise")

// get user exercises (custom exercises)
const getUserExercises = async (req, res) => {
  console.log("User ID: ", req.params.id);
  if (!req?.params?.id) return res.status(400).json({ 'message' : 'User ID required.'}) // 400 Bad Request

  const exercises = await UserExercise.find({ userId: req.params.id }).exec()

  if (!exercises || exercises.length === 0)
    return res.status(204).json({ message: "No exercises found." })
  res.json(exercises)
}

// create user exercise (custom exercise)
const createUserExercise = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message' : 'User ID required.'}) // 400 Bad Request

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

// const updateUserExercise

module.exports = {
  getUserExercises,
  createUserExercise,
  // updateUserExercise,
}
