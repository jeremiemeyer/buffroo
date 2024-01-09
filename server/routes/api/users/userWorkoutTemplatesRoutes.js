const express = require('express');
const router = express.Router();
const userWorkoutTemplatesController = require('../../../controllers/api/users/userWorkoutTemplatesController');

/**
 * @swagger
 * tags:
 *   name: UserTemplates
 *   description: Operations related to user workout templates.
 */

/**
 * @swagger
 *   /api/users/{userId}/templates:
 *     get:
 *       summary: Get user workout templates.
 *       description: Retrieve workout templates for the specified user.
 *       tags: [UserTemplates]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve workout templates for.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns workout templates.
 *         '204':
 *           description: No workout templates found for the provided user ID.
 *         '400':
 *           description: Bad request. User ID is required.
 */

/**
 * @swagger
 *   /api/users/{userId}/templates/{templateId}:
 *     get:
 *       summary: Get user workout template by ID.
 *       description: Retrieve workout template details for the specified user and template ID.
 *       tags: [UserTemplates]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve workout template for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: templateId
 *           required: true
 *           description: ID of the workout template to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns workout template details.
 *         '204':
 *           description: No workout template found for the provided user and template ID.
 *         '400':
 *           description: Bad request. User and template ID are required.
 *         '500':
 *           description: Internal server error.
 */

/**
 * @swagger
 *   /api/users/{userId}/templates:
 *     post:
 *       summary: Create a new user workout template.
 *       description: Create a new workout template for the specified user.
 *       tags: [UserTemplates]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to create a workout template for.
 *           schema:
 *             type: string
 *         - in: body
 *           name: templateData
 *           required: true
 *           description: Data for the new workout template.
 *           schema:
 *             type: object
 *       responses:
 *         '201':
 *           description: Successful operation. Returns the created workout template.
 *         '400':
 *           description: Bad request. User ID, name, and exercises are required.
 */

/**
 * @swagger
 *   /api/users/{userId}/templates/{templateId}:
 *     put:
 *       summary: Edit user workout template by ID.
 *       description: Edit workout template details for the specified user and template ID.
 *       tags: [UserTemplates]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to edit workout template for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: templateId
 *           required: true
 *           description: ID of the workout template to edit.
 *           schema:
 *             type: string
 *         - in: body
 *           name: templateData
 *           required: true
 *           description: Updated workout template data.
 *           schema:
 *             type: object
 *       responses:
 *         '200':
 *           description: Successful operation. Returns the updated workout template.
 *         '204':
 *           description: No workout template found for the provided user and template ID.
 *         '400':
 *           description: Bad request. User and template ID are required.
 *         '500':
 *           description: Internal server error. Error updating workout template.
 */

/**
 * @swagger
 *   /api/users/{userId}/templates/{templateId}:
 *     delete:
 *       summary: Delete user workout template by ID.
 *       description: Delete workout template for the specified user and template ID.
 *       tags: [UserTemplates]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to delete workout template for.
 *           schema:
 *             type: string
 *         - in: path
 *           name: templateId
 *           required: true
 *           description: ID of the workout template to delete.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns success message.
 *         '400':
 *           description: Bad request. User and template ID are required.
 *         '500':
 *           description: Internal server error. Error deleting workout template.
 */

router.route('/:userId/templates')
    .get(userWorkoutTemplatesController.getUserWorkoutTemplates)
    .post(userWorkoutTemplatesController.createUserWorkoutTemplate)

router.route('/:userId/templates/:templateId')
    .get(userWorkoutTemplatesController.getUserWorkoutTemplate)
    .put(userWorkoutTemplatesController.editUserWorkoutTemplate)
    .delete(userWorkoutTemplatesController.deleteUserWorkoutTemplate)

module.exports = router;