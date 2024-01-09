const express = require('express');
const router = express.Router();
const userExercisesController = require('../../../controllers/api/users/userExercisesController');

/**
 * @swagger
 * tags:
 *   name: UserExercises
 *   description: Operations related to users exercises.
 */

/**
 * @swagger
 * /api/users/{id}/exercises:
 *   get:
 *     summary: Get user exercises
 *     description: Get custom exercises for a specific user.
 *     tags: [UserExercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful request. Returns an array of user exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExercise'
 *       '204':
 *         description: No exercises found for the user.
 *       '400':
 *         description: Bad Request. User ID is required.
 */
router.route('/:id/exercises')
    .get(userExercisesController.getUserExercises)
    /**
     * @swagger
     * /api/users/{id}/exercises:
     *   post:
     *     summary: Create user exercise
     *     description: Create a custom exercise for a specific user.
     *     tags: [UserExercises]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: User ID
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserExercise'
     *     responses:
     *       '201':
     *         description: User exercise created successfully. Returns the created user exercise.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserExercise'
     *       '400':
     *         description: Bad Request. User ID, exercise name, bodypart, and category are required.
     */
    .post(userExercisesController.createUserExercise);

/**
 * @swagger
 * /api/users/{userId}/exercises/{exerciseId}:
 *   patch:
 *     summary: Update user exercise
 *     description: Update a custom exercise for a specific user.
 *     tags: [UserExercises]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         description: Exercise ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserExercise'
 *     responses:
 *       '200':
 *         description: User exercise updated successfully. Returns the updated user exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExercise'
 *       '400':
 *         description: Bad Request. User ID, exercise ID, and exercise data are required.
 *       '500':
 *         description: Internal Server Error. Error updating user exercise.
 */
router.route('/:userId/exercises/:exerciseId')
    .patch(userExercisesController.updateUserExercise);

module.exports = router;
