const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: {
    User: { type: Number, default: 2001 },
    Admin: { type: Number },
  },
  refreshToken: { type: String },
  userData: {
    preferences: {
      theme: { type: String, default: "light" },
      unitSystem: { type: String, default: "metric" },
    },
    goals: {
      workoutsPerWeek: { type: Number, default: 3 },
    },
    dashboard: [
      {
        type: { type: String, required: true },
        exerciseId: { type: String },
      },
    ],
  },
})

const User = mongoose.model("User", userSchema, "users")
// by default, if there's no 3rd prop, mongoose looks for a collection named "User" but lowercase + plural. I prefer to specify it explicitly

module.exports = User
