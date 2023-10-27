const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/users/userController');

router.route('/:userId')
    .get(userController.getUserData)
    .patch(userController.editUserPreferences)

module.exports = router;