const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSessionSchema = new Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true},
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
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

const WorkoutSession = mongoose.model(
  "WorkoutSession",
  workoutSessionSchema,
  "user_sessions"
)

module.exports = WorkoutSession
