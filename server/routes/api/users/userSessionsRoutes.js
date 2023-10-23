const express = require('express');
const router = express.Router();
const userSessionsController = require('../../../controllers/api/users/userSessionsController');

router.route('/:id/sessions')
    .get(userSessionsController.getUserSessions)
    .post(userSessionsController.createUserSession)

module.exports = router;