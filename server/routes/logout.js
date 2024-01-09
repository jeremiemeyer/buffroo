const express = require('express')
const router = express.Router()
const logoutController = require('../controllers/logoutController')

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user
 *     description: Logout user by clearing the refresh token and deleting associated cookies.
 *     responses:
 *       '204':
 *         description: Logout successful. No Content.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/', logoutController.handleLogout)

module.exports = router