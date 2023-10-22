const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  bodypart: { type: String, required: true },
  category: { type: String, required: false },
})

const UserExercise = mongoose.model("UserExercise", exerciseSchema, "user_exercises")

module.exports = UserExercise
