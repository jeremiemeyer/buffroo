const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: { type: Number },
  },
  preferences: {
    unitsystem: {
      type: String,
      default: "metric",
    },
    theme: {
      type: String,
      default: "light"
    },
  },
  refreshToken: { type: String },
})

const User = mongoose.model("User", userSchema, "users")
// by default, if there's no 3rd prop, mongoose looks for a collection named "User" but lowercase + plural. I prefer to specify it explicitly

module.exports = User
