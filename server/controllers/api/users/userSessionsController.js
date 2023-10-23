const WorkoutSession = require("../../../models/WorkoutSession")

// get user sessions (history)
const getUserSessions = async (req, res) => {
  if (!req?.params?.userId)
    return res.status(400).json({ message: "User ID required." })

  const sessions = await WorkoutSession.find({
    userId: req.params.userId,
  }).exec()

  if (!sessions || sessions.length === 0)
    return res.status(204).json({ message: "No workout sessions found." })
  res.json(sessions)
}

// add session to history (when workout session is submitted)
const createUserSession = async (req, res) => {
  if (!req?.params?.userId)
    return res.status(400).json({ message: "User ID required." })

  if (
    !req?.body?.userId ||
    !req?.body?.startdate ||
    !req?.body?.enddate ||
    !req?.body?.exercises
  ) {
    return res.status(400).json({
      message:
        "A session requires: user ID, start date, end date and exercises to be submitted.",
    })
  }

  try {
    const { startdate, enddate, notes, exercises } = req.body
    const userId = req.params.userId

    const newUserSession = await WorkoutSession.create({
      startdate: startdate,
      enddate: enddate,
      notes: notes,
      exercises: exercises,
      userId: userId,
    })
    res.status(201).json(newUserSession) // 201 Created
  } catch (err) {
    console.error(err)
  }
}

// const updateUserSession = async (req, res) => {

// }

const deleteUserSession = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.sessionId)
    return res.status(400).json({ message: "User and session ID required." })

  try {
    const userId = req.params.userId
    const sessionId = req.params.sessionId

    // Find the session by session ID and user ID
    const session = await WorkoutSession.findOneAndRemove({
      _id: sessionId,
      userId: userId,
    })

    if (!session) return res.status(500)

    res.json({ message: "Session deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// const updateUserSession

module.exports = {
  getUserSessions,
  createUserSession,
  deleteUserSession,
  // updateUserSession,
}
