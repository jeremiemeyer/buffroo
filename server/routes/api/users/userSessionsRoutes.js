const express = require('express');
const router = express.Router();
const userSessionsController = require('../../../controllers/api/users/userSessionsController');

/**
 * @swagger
 * tags:
 *   name: UserSessions
 *   description: Operations related to user information and activities.
 */

/**
 * @swagger
 *   /api/users/{userId}/sessions:
 *     get:
 *       summary: Get user workout sessions.
 *       description: Retrieve workout sessions for the specified user.
 *       tags: [UserSessions]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve workout sessions for.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns workout sessions.
 *         '204':
 *           description: No workout sessions found for the provided user ID.
 *         '400':
 *           description: Bad request. User ID is required.
 */

/**
 * @swagger
 *   /api/users/{userId}/sessions/{sessionId}:
 *     get:
 *       summary: Get user workout session by ID.
 *       description: Retrieve workout session details for the specified user and session ID.
 *       tags: [UserSessions]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve workout session for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: sessionId
 *           required: true
 *           description: ID of the workout session to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns workout session details.
 *         '204':
 *           description: No workout session found for the provided user and session ID.
 *         '400':
 *           description: Bad request. User and session ID are required.
 *         '500':
 *           description: Internal server error.
 */

/**
 * @swagger
 *   /api/users/{userId}/sessions:
 *     post:
 *       summary: Create a new user workout session.
 *       description: Create a new workout session for the specified user.
 *       tags: [UserSessions]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to create a workout session for.
 *           schema:
 *             type: string
 *         - in: body
 *           name: sessionData
 *           required: true
 *           description: Data for the new workout session.
 *           schema:
 *             type: object
 *       responses:
 *         '201':
 *           description: Successful operation. Returns the created workout session.
 *         '400':
 *           description: Bad request. User ID, start date, end date, and exercises are required.
 */

/**
 * @swagger
 *   /api/users/{userId}/sessions/{sessionId}:
 *     put:
 *       summary: Edit user workout session by ID.
 *       description: Edit workout session details for the specified user and session ID.
 *       tags: [UserSessions]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to edit workout session for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: sessionId
 *           required: true
 *           description: ID of the workout session to edit.
 *           schema:
 *             type: string
 *         - in: body
 *           name: sessionData
 *           required: true
 *           description: Updated workout session data.
 *           schema:
 *             type: object
 *       responses:
 *         '200':
 *           description: Successful operation. Returns the updated workout session.
 *         '204':
 *           description: No workout session found for the provided user and session ID.
 *         '400':
 *           description: Bad request. User and session ID are required.
 *         '500':
 *           description: Internal server error. Error updating workout session.
 */

/**
 * @swagger
 *   /api/users/{userId}/sessions/{sessionId}:
 *     delete:
 *       summary: Delete user workout session by ID.
 *       description: Delete workout session for the specified user and session ID.
 *       tags: [UserSessions]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to delete workout session for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: sessionId
 *           required: true
 *           description: ID of the workout session to delete.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns success message.
 *         '400':
 *           description: Bad request. User and session ID are required.
 *         '500':
 *           description: Internal server error. Error deleting workout session.
 */

router.route('/:userId/sessions')
    .get(userSessionsController.getUserSessions)
    .post(userSessionsController.createUserSession);

router.route('/:userId/sessions/:sessionId')
    .get(userSessionsController.getUserSession)
    .put(userSessionsController.editUserSession)
    .delete(userSessionsController.deleteUserSession);

module.exports = router;