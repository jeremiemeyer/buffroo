const express = require('express');
const router = express.Router();
const userSessionsController = require('../../../controllers/api/users/userSessionsController');

router.route('/:userId/sessions')
    .get(userSessionsController.getUserSessions)
    .post(userSessionsController.createUserSession)

router.route('/:userId/sessions/:sessionId')
    .delete(userSessionsController.deleteUserSession)

module.exports = router;