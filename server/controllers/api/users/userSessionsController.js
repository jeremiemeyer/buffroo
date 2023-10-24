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

// get user session by id
const getUserSession = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.sessionId) {
    return res
      .status(400)
      .json({ message: "Requires a user ID and a session ID." })
  }

  try {
    const { userId, sessionId } = req.params

    const sessionData = await WorkoutSession.find({ _id: sessionId }).exec()
    if (sessionData && sessionData.length > 0) {
      return res.json(sessionData[0])
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

// add session to history (when workout session is submitted)
const createUserSession = async (req, res) => {
  if (
    !req?.params?.userId ||
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
    const { name, startdate, enddate, notes, exercises } = req.body
    const userId = req.params.userId

    const newUserSession = await WorkoutSession.create({
      name: name,
      startdate: startdate,
      enddate: enddate,
      notes: notes,
      exercises: exercises,
      userId: userId,
    })
    console.log(newUserSession)
    res.status(201).json(newUserSession) // 201 Created
  } catch (err) {
    console.error(err)
  }
}

// put
const editUserSession = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.sessionId)
    return res.status(400).json({ message: "User and session ID required." })

  try {
    // Get the updated session data from the request body
    const { name, startdate, enddate, notes, exercises } = req.body
    const { userId, sessionId } = req.params

    // Create an object with the updated data
    const updatedSessionData = {
      name: name,
      startdate: startdate,
      enddate: enddate,
      notes: notes,
      exercises: exercises,
      userId: userId,
      _id: sessionId,
    }

    // Find the session by session ID and user ID, and update it with the new data
    const updatedSession = await WorkoutSession.findByIdAndUpdate(
      sessionId,
      updatedSessionData,
      { new: true } // This option returns the updated session
    )

    if (!updatedSession) {
      return res.status(500).json({ message: "Failed to update session." })
    }

    res.json(updatedSession)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

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
  getUserSession,
  createUserSession,
  editUserSession,
  deleteUserSession,
  // updateUserSession,
}
