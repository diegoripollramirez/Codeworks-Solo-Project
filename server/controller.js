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
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //TODO sanitize user input
    const user = await userModel.findOne({ 'userName': userName });
    if (!user) {
      return res.status(400).json({ error: 'User not found in data base' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({ logged: true });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(400).json({ error: 'Error Parameters missing' });
  }
};

const getSchedule = async (req, res) => {
  try {
    const { userName } = req.params;
    const schedule = await userModel.findOne({ userName });
    res.status(200).json(schedule.mealShedule);
  } catch (error) {
    console.error('Error getting the schedule:', error);
    res.status(500).json({ error: 'Error fetching schedule' });
  }
};

const postSchedule = async (req, res) => {
  try {
    //TODO sanitize user input
    const { selectedMeals } = req.body;
    const { userName } = req.params;
    const updatedUser = await userModel.updateOne(
      { userName },
      { mealShedule: selectedMeals }
    );
    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "Schedule updated successfully", updatedUser });
  } catch (error) {
    console.error('Error loading user schedule:', error);
    res.status(400).json({ error: 'Parameters of recipe missing' });
  }
};


const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error getting the recipes:', error);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

const postRecipe = async (req, res) => {
  try {
    //TODO sanitize user input
    const { author, recipeName, instructions, ingredients } = req.body;
    const newRecipe = await recipeModel.create({ author, recipeName, instructions, ingredients });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error saving the recipe:', error);
    res.status(400).json({ error: 'Parameters of recipe missing' });
  }
};

const putRecipe = async (req, res) => {
  //TODO should we be able to edit recipes or just create and delete them?
};

const deleteRecipe = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedRecipe = await recipeModel.findOneAndDelete({ _id });
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    res.status(500).json({ error: "An error occurred while deleting the recipe" });
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredients = await ingredientModel.find();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('Error loading the ingredients:', error);
    res.status(500).json({ error: 'Error fetching ingredients' });
  }
};

const postIngredient = async (req, res) => {
  try {
    const { ingredientName, unit } = req.body;
    const newIngredient = await ingredientModel.create({ ingredientName, unit });
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error('Error saving the new:', error);
    res.status(400).json({ error: 'Error Parameters of ingredient missing' });
  }
};

module.exports = { register, login, getSchedule, postSchedule, getRecipes, postRecipe, putRecipe, deleteRecipe, getIngredients, postIngredient };