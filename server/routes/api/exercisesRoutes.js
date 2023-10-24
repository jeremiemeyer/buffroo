const express = require("express")
const router = express.Router()
const exercisesController = require("../../controllers/api/exercisesController")
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User), exercisesController.getExercises)

  // get details for a specific exercise
router
  .route("/:exerciseId")
  .get(verifyRoles(ROLES_LIST.User), exercisesController.getExerciseData)

module.exports = router
