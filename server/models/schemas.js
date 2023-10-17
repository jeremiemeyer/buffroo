const mongoose = require("mongoose")
const Schema = mongoose.Schema

// exercise card
const exerciseSchema = new Schema({
  name: { type: String, required: true },
  bodypart: { type: String, required: true },
  category: { type: String, required: false },
})


const workoutSessionSchema = new Schema({
  notes: { type: String, required: false },
  exercises: [
    {
      name: String,
      sets: [
        {
          reps: Number,
          weight: Number,
          rpe: Number,
        },
      ],
    },
  ],
})

const Exercise = mongoose.model("Exercise", exerciseSchema, "exercises")
const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema, "user_sessions")
const mySchemas = { Exercise: Exercise, WorkoutSession: WorkoutSession }

module.exports = mySchemas
