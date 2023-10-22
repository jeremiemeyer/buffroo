const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  bodypart: { type: String, required: true },
  category: { type: String, required: false },
})

const Exercise = mongoose.model("Exercise", exerciseSchema, "exercises")

module.exports = Exercise
