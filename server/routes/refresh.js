const express = require('express')
const router = express.Router()
const refreshTokenController = require('../controllers/refreshTokenController')

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     description: Use a refresh token to obtain a new access token.
 *     responses:
 *       '200':
 *         description: New access token obtained successfully.
 *         content:
 *           application/json:
 *             example:
 *               roles: ["role1", "role2"]
 *               accessToken: "new-access-token"
 *               username: "username"
 *               userId: "user-id"
 *       '401':
 *         description: Unauthorized. No valid refresh token provided.
 *       '403':
 *         description: Forbidden. Refresh token is not associated with any user or is invalid.
 */
router.get('/', refreshTokenController.handleRefreshToken)

module.exports = router