require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs');
const WorkoutSession = require("./models/WorkoutSession")
const connectDB = require('./config/dbConn')


// Read the Buffroo data from the JSON file
const buffrooData = JSON.parse(fs.readFileSync('./data/buffrooOutput.json', 'utf8'));

connectDB()

// Function to import data into MongoDB using Mongoose
async function importData() {
  try {
    // Insert Buffroo data into the MongoDB collection using the Mongoose model
    const result = await WorkoutSession.insertMany(buffrooData);
    console.log(`Inserted ${result.length} documents into the collection.`);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Call the importData function to start the import process
importData().catch(console.error);