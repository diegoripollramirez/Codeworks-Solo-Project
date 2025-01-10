'use strict'

const mongoose = require('mongoose');

// Definir el esquema del modelo
const recipesSchema = new mongoose.Schema({
  author: { type: String, required: true },
  recipeName: { type: String, required: true },
  instructions: { type: [], required: true },
  ingredients: { type: [], required: true },
}, { timestamps: false });

// Crear el modelo a partir del esquema
const recipeModel = mongoose.model('recipeModel', recipesSchema);

// Exportar el modelo
module.exports = recipeModel;
