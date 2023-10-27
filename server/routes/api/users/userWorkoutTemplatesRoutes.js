const express = require('express');
const router = express.Router();
const userWorkoutTemplatesController = require('../../../controllers/api/users/userWorkoutTemplatesController');

router.route('/:userId/templates')
    .get(userWorkoutTemplatesController.getUserWorkoutTemplates)
    .post(userWorkoutTemplatesController.createUserWorkoutTemplate)

router.route('/:userId/templates/:templateId')
    .get(userWorkoutTemplatesController.getUserWorkoutTemplate)
    .put(userWorkoutTemplatesController.editUserWorkoutTemplate)
    .delete(userWorkoutTemplatesController.deleteUserWorkoutTemplate)

module.exports = router;