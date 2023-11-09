const User = require("./../../../models/User")

const getUserData = async (req, res) => {
  console.log("User ID: ", req.params.userId)
  if (!req?.params?.userId)
    return res.status(400).json({ message: "User ID required." }) // 400 Bad Request

  const { userId } = req.params
  const userData = await User.findOne({ _id: userId }).exec()

  if (!userData) return res.status(204).json({ message: "No user found." })

  res.json(userData)
}

const editUserData = async (req, res) => {
  if (!req?.params?.userId)
    return res.status(400).json({ message: "User ID required." }) // 400 Bad Request

  const { userId } = req.params
  const { userData } = req.body
  // console.log(userId, userData)

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { userData: userData },
    { new: true }
  ).exec()

  if (!updatedUser)
    return res.status(500).json({ message: "Error updating user data" })
  res.json(updatedUser)
}

module.exports = {
  getUserData,
  editUserData,
  // updateUserExercise,
}
