'use strict';

const bcrypt = require('bcrypt');

const userModel = require('./dataBase/usersModel.js');
const recipeModel = require('./dataBase/recipeModel.js');
const ingredientModel = require('./dataBase/ingredientModel.js');

const register = async (req, res) => {
  try {
    const { userName, password } = req.body;
//TODO sanitize user input
    //Check if user already exists
    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    //encrypt password before saving user data
    const encyptedPass = await bcrypt.hash(password, 10);
    const newUser = new userModel({ userName, password: encyptedPass });
    await newUser.save()
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //TODO sanitize user input
    const user = await userModel.findOne({ 'userName': userName });
    if (!user) {
      return res.status(400).json({ logged: false, message: 'User not found in data base' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({ logged: true });
    } else {
      res.status(401).json({ logged: false, message: 'Invalid password' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error Parameters missing' });
  }
};


const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

const postRecipe = async (req, res) => {
  try {
    const { author, recipeName, instructions, ingredients } = req.body;
    const newRecipe = await Evento.create({ author, recipeName, instructions, ingredients });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: 'Error Parameters of recipe missing' });
  }
};

const putRecipe = async (req, res) => {

};

const deleteRecipe = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleted = await Evento.findByIdAndDelete(_id);

    if (deleted) {
      res.status(200).json({ message: 'Expired Event deleted' });
    } else {
      res.status(404).json({ error: 'Expired event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expired event' });
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredients = await recipeModel.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ingredients' });
  }
};

const postIngredient = async (req, res) => {
  try {
    const { ingredientName, unit } = req.body;
    const newIngredient = await ingredientModel.create({ ingredientName, unit });
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).json({ error: 'Error Parameters of ingredient missing' });
  }
};

const deleteIngredient = async (req, res) => {

};


module.exports = { register, login, getRecipes, postRecipe, putRecipe, deleteRecipe, getIngredients, postIngredient, deleteIngredient };