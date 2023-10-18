const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc"

router.get("/exercises", async (req, res) => {
  const exercises = schemas.Exercise

  const exercisesData = await exercises.find().exec()
  if (exercisesData) {
    res.send(exercisesData)
  } else {
    res.send("Failed to get data.")
  }
})

router.get("/history", async (req, res) => {
  const sessions = schemas.WorkoutSession

  const historyData = await sessions.find().exec()
  if (historyData) {
    res.send(historyData)
  } else {
    res.send("Failed to get data.")
  }
})

router.post("/exercises", async (req, res) => {
  const { name, bodypart, category } = req.body

  const exerciseData = {
    name: name,
    bodypart: bodypart,
    category: category,
  }

  const newExercise = new schemas.Exercise(exerciseData)
  const saveExercise = await newExercise.save()

  if (saveExercise) {
    res.send("New exercise added to DB!")
  } else {
    res.send("Failed to add new exercise to DB.")
  }
  res.end()
})

router.post("/sessions", async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const newWorkoutSession = new schemas.WorkoutSession({
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      notes: req.body.notes,
      exercises: req.body.exercises,
    })

    const saveWorkoutSession = await newWorkoutSession.save()

    if (saveWorkoutSession) {
      res.status(201).json({ message: "Workout session created successfully" })
    } else {
      res.status(500).json({ message: "Failed to create workout session" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating workout session", error: error.message })
  }
})

module.exports = router
