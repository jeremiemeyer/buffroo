const WorkoutSession = require("../../../models/WorkoutSession")

// get user sessions (history)
const getUserSessions = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message' : 'User ID required.'})

  const sessions = await WorkoutSession.find({ userId: req.params.id }).exec()

  if (!sessions || sessions.length === 0)
    return res.status(204).json({ message: "No workout sessions found." })
  res.json(sessions)
}

// add session to history (when workout session is submitted)
const createUserSession = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message' : 'User ID required.'})

  if (!req?.body?.startdate || !req?.body?.enddate || !req?.body?.exercises) {
    return res.status(400).json({
      message:
        "A session requires a start date, end date and exercises to be submitted.",
    })
  }

  try {
    const { startdate, enddate, notes, exercises } = req.body
    const userId = req.params.id

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

// const updateUserSession

module.exports = {
  getUserSessions,
  createUserSession,
  // updateUserSession,
}
