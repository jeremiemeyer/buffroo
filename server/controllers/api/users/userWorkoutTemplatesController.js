const UserWorkoutTemplate = require("../../../models/UserWorkoutTemplate")

const getUserWorkoutTemplates = async (req, res) => {
  if (!req?.params?.userId)
    return res.status(400).json({ message: "User ID required." })

  const templates = await UserWorkoutTemplate.find({
    userId: req.params.userId,
  }).exec()

  if (!templates || templates.length === 0)
    return res.status(204).json({ message: "No workout template found." })
  res.json(templates)
}

const getUserWorkoutTemplate = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.templateId) {
    return res
      .status(400)
      .json({ message: "Requires a user ID and a template ID." })
  }

  try {
    const { userId, templateId } = req.params

    const templateData = await UserWorkoutTemplate.findOne({
      _id: templateId,
    }).exec()
    if (templateData) {
      return res.json(templateData)
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

const createUserWorkoutTemplate = async (req, res) => {
  console.log(req.params)
  console.log(req.body)

  if (!req?.params?.userId || !req?.body?.exercises || !req?.body?.name) {
    return res.status(400).json({
      message:
        "A session requires: user ID, start date, end date and exercises to be submitted.",
    })
  }

  try {
    const { name, notes, exercises } = req.body
    const userId = req.params.userId

    const newUserWorkoutTemplate = await UserWorkoutTemplate.create({
      name: name,
      exercises: exercises,
      notes: notes,
      userId: userId,
    })
    console.log(newUserWorkoutTemplate)
    res.status(201).json(newUserWorkoutTemplate) // 201 Created
  } catch (err) {
    console.error(err)
  }
}

// put
const editUserWorkoutTemplate = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.templateId)
    return res.status(400).json({ message: "User and template ID required." })

  try {
    const { name, notes, exercises, startdate, enddate } = req.body
    const { userId, templateId } = req.params

    const updatedTemplateData = {
      name: name,
      startdate: startdate,
      enddate: enddate,
      notes: notes,
      exercises: exercises,
      userId: userId,
      _id: templateId,
    }

    const updatedUserWorkoutTemplate =
      await UserWorkoutTemplate.findByIdAndUpdate(
        templateId,
        updatedTemplateData,
        { new: true } // This option returns the updated session
      )

    if (!updatedUserWorkoutTemplate) {
      return res
        .status(500)
        .json({ message: "Failed to update user template." })
    }

    res.json(updatedUserWorkoutTemplate)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const deleteUserWorkoutTemplate = async (req, res) => {
  if (!req?.params?.userId || !req?.params?.templateId)
    return res.status(400).json({ message: "User and template ID required." })

  try {
    const { userId, templateId } = req.params

    const templateToDelete = await UserWorkoutTemplate.findOneAndRemove({
      _id: templateId,
      userId: userId,
    })

    if (!templateToDelete) return res.status(500)

    res.json({ message: "User template deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = {
  getUserWorkoutTemplates,
  getUserWorkoutTemplate,
  createUserWorkoutTemplate,
  editUserWorkoutTemplate,
  deleteUserWorkoutTemplate,
}
