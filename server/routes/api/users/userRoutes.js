const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/users/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users.
 */

/**
 * @swagger
 *   /api/users/{userId}:
 *     get:
 *       summary: Get user data by ID.
 *       description: Retrieve user data based on the provided user ID.
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve data for.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns user data.
 *         '204':
 *           description: No user found for the provided ID.
 *         '400':
 *           description: Bad request. User ID is required.
 */

/**
 * @swagger
 *   /api/users/{userId}:
 *     patch:
 *       summary: Edit user data by ID.
 *       description: Edit user data based on the provided user ID.
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to edit data for.
 *           schema:
 *             type: string
 *         - in: body
 *           name: userData
 *           required: true
 *           description: Updated user data.
 *           schema:
 *             type: object
 *       responses:
 *         '200':
 *           description: Successful operation. Returns the updated user data.
 *         '204':
 *           description: No user found for the provided ID.
 *         '400':
 *           description: Bad request. User ID is required.
 *         '500':
 *           description: Internal server error. Error updating user data.
 */

router.route('/:userId')
    .get(userController.getUserData)
    .patch(userController.editUserData);

module.exports = router;