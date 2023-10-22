const express = require('express');
const router = express.Router();
const userExercisesController = require('../../../controllers/api/users/userExercisesController');

router.route('/')
    .get(userExercisesController.getUserExercises)
    .post(userExercisesController.createUserExercise)

module.exports = router;