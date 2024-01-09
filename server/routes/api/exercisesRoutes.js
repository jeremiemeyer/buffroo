const express = require("express")
const router = express.Router()
const exercisesController = require("../../controllers/api/exercisesController")
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Operations related to exercises.
 */

/**
 * @swagger
 *   /api/exercises:
 *     get:
 *       summary: Get default app exercises.
 *       description: Retrieve a list of default app exercises.
 *       tags: [Exercises]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation. Returns a list of default app exercises.
 *         '204':
 *           description: No exercises found.
 *         '500':
 *           description: Internal server error.
 */

/**
 * @swagger
 *   /api/exercises/{exerciseId}:
 *     get:
 *       summary: Get details for a specific exercise.
 *       description: Retrieve details for a specific exercise identified by the exercise ID.
 *       tags: [Exercises]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: exerciseId
 *           required: true
 *           description: ID of the exercise to retrieve details for.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns details for the specified exercise.
 *         '204':
 *           description: No exercises found for the provided exercise ID.
 *         '400':
 *           description: Bad request. Exercise ID is required.
 *         '500':
 *           description: Internal server error.
 */

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User), exercisesController.getExercises)

  // get details for a specific exercise
router
  .route("/:exerciseId")
  .get(verifyRoles(ROLES_LIST.User), exercisesController.getExerciseData)

module.exports = router
