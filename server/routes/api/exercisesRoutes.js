const express = require("express")
const router = express.Router()
const exercisesController = require("../../controllers/api/exercisesController")
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User), exercisesController.getExercises)

module.exports = router
