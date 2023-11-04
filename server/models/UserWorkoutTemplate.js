const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userWorkoutTemplateSchema = new Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true},
  notes: { type: String, required: false },
  exercises: [
    {
      name: { type: String },
      sets: [
        {
          reps: { type: Number },
          weight: { type: Number },
          rpe: { type: Number },
        },
      ],
      exerciseId: { type: String },
    },
  ],
})

const UserWorkoutTemplate = mongoose.model(
  "UserWorkoutTemplate",
  userWorkoutTemplateSchema,
  "user_templates"
)

module.exports = UserWorkoutTemplate
