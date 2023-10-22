// const express = require("express")
// const router = express.Router()
// const schemas = require("../models/schemas")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc"


// router.get("/exercises", async (req, res) => {
//   try {
//     const exercises = schemas.Exercise
//     const exercisesData = await exercises.find().exec()
//     res.send(exercisesData)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching exercises", error: error.message })
//   }
// })

// router.post("/exercises", async (req, res) => {
//   try {
//     const { name, bodypart, category } = req.body

//     const exerciseData = {
//       name: name,
//       bodypart: bodypart,
//       category: category,
//     }

//     const newExercise = new schemas.Exercise(exerciseData)
//     const saveExercise = await newExercise.save()

//     if (saveExercise) {
//       res.send("New exercise added to DB!")
//     } else {
//       throw new Error("Failed to add new exercise to DB.")
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error adding a new exercise", error: error.message })
//   }
// })


// router.get("/history", async (req, res) => {
//   try {
//     const sessions = schemas.WorkoutSession
//     const historyData = await sessions.find().exec()
//     res.send(historyData)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching workout history", error: error.message })
//   }
// })



// router.post("/sessions", async (req, res) => {
//   try {
//     console.log("Received request body:", req.body)

//     const newWorkoutSession = new schemas.WorkoutSession({
//       startdate: req.body.startdate,
//       enddate: req.body.enddate,
//       notes: req.body.notes,
//       exercises: req.body.exercises,
//     })

//     const saveWorkoutSession = await newWorkoutSession.save()

//     if (saveWorkoutSession) {
//       res.status(201).json({ message: "Workout session created successfully" })
//     } else {
//       res.status(500).json({ message: "Failed to create workout session" })
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating workout session", error: error.message })
//   }
// })

// module.exports = router
