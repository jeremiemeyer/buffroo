const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The username of the new user.
 *               pwd:
 *                 type: string
 *                 description: The password of the new user.
 *               email:
 *                 type: string
 *                 description: The email address of the new user.
 *     responses:
 *       '201':
 *         description: New user created successfully.
 *       '400':
 *         description: Bad Request - Username and password are required.
 *       '409':
 *         description: Conflict - Username already exists.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/', registerController.handleNewUser)

module.exports = router