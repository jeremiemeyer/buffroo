const express = require('express');
const router = express.Router();
const userExercisesController = require('../../../controllers/api/users/userExercisesController');

router.route('/:id/exercises')
    .get(userExercisesController.getUserExercises)
    .post(userExercisesController.createUserExercise)

router.route('/:userId/exercises/:exerciseId')
    .patch(userExercisesController.updateUserExercise)

module.exports = router;