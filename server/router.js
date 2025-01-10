'use strict'
const express = require('express');
const router = express.Router();

const controller= require('./controller')

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/recipes', controller.getRecipes);
router.post('/recipes', controller.postRecipe);
router.put('/recipes', controller.putRecipe);
router.delete('/recipes', controller.deleteRecipe);

router.get('/ingredients', controller.getIngredients);
router.post('/ingredients', controller.postIngredient);
router.delete('/ingredients', controller.deleteIngredient);

module.exports = router;
