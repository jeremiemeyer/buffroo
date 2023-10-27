require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')
// const { logger } = require('./middleware/logEvents')
// const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || "8080"

// Connect to MongoDB
connectDB()

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials)

// cross origin resource sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// routes
app.use("/register", require("./routes/register"))
app.use("/auth", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))

app.use(verifyJWT)
app.use("/api/exercises", require("./routes/api/exercisesRoutes"))
app.use("/api/users", require('./routes/api/users/userRoutes'))
app.use("/api/users", require('./routes/api/users/userExercisesRoutes'))
app.use("/api/users", require('./routes/api/users/userSessionsRoutes'))


// app.use(errorHandler) // to implement

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
  })
})
