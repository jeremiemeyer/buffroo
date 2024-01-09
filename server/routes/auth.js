const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user by checking the username and password. Returns access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Username of the user.
 *               pwd:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Authentication successful. Returns access and refresh tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the authenticated user.
 *                 roles:
 *                   type: array
 *                   description: Array of user roles.
 *                   items:
 *                     type: string
 *                 username:
 *                   type: string
 *                   description: Username of the authenticated user.
 *                 userId:
 *                   type: string
 *                   description: ID of the authenticated user.
 *       '400':
 *         description: Bad Request. Username and password are required.
 *       '401':
 *         description: Unauthorized. Incorrect username or password.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/', authController.handleLogin)

module.exports = router