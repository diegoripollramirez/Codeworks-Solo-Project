import React from 'react'
import { useEffect, useState } from 'react';
import { postRecipe } from './services/recipeServices';
import { getIngredients, postIngredient } from './services/ingredientServices';

const recipeEdit = ({ setCurrentTab, userName, recipes, setRecipes }) => {
  const [ingredients, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    recipeName: "",
    author: userName,
    ingredients: [],
    instructions: [],
  });
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: "",
    unit: "",
    quantity: "",
  });
  const [newInstruction, setNewInstruction] = useState({
    minutes: "",
    text: "",
  });

  const saveRecipe = async () => {
    try {
      const existingRecipe = recipes.find(
        (recipe) => recipe.recipeName === newRecipe.recipeName
      );
      if (existingRecipe) {
        alert("Recipe with this name already exists!");
        return;
      }
      const newRecipeData = await postRecipe(newRecipe);
      setRecipes((prev) => [...prev, newRecipeData]);
      setCurrentTab('recipeList')
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  // Need an ingredients list to sum their amounts and avoid same ingredient with diferent names (spaghetti, spagheti,spagetti) or different units (grams, g., kg)
  const fetchIngredients = async () => {
    try {
      const ingredientsData = await getIngredients();
      setIngredients(ingredientsData);
    } catch (error) {
      console.error("Failed to fetch ingredients");
    }
  };

  useEffect(() => {
    fetchIngredients();
  });

  const addNameToRecipe = (e) => {
    setNewRecipe((prev) => ({
      ...prev,
      recipeName: e.target.value,
    }));
  };

  //Not using inline handlers to avoid the creation of the funcionts each time the comoponent is rerendered
  const handleIngredientChange = (formField, value) => {
    setNewIngredient((prev) => ({ ...prev, [formField]: value }));
  };

  const addIngredientToRecipe = () => { //and to the db if does not exist
    const existingIngredient = ingredients.find(
      (ingredient) => ingredient.ingredientName === newIngredient.ingredientName
    );
    if (!existingIngredient) {
      postIngredient(newIngredient.ingredientName, newIngredient.unit);
    }
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
    setNewIngredient({ ingredientName: "", unit: "", quantity: "" }); //clear values
  };

  const handleInstructionChange = (formField, value) => {
    setNewInstruction((prev) => ({ ...prev, [formField]: value }));
  };

  const addInstructionToRecipe = () => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, newInstruction],
    }));
    setNewInstruction({ minutes: "", text: "" }); //clear values
  };

  return (
    <>
      <div className="newRecipe">
        <h1>New Recipe</h1>
        <form
          className="newRecipeForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveRecipe(newRecipe);
          }}
        >

          <div className="recipeSections">
            <div className="recipeName">
              <h3>Recipe Name</h3>
              <div className="formGroup">
                <input
                  type="text"
                  name="recipeName"
                  value={newRecipe.recipeName}
                  onChange={addNameToRecipe}
                  placeholder="Enter the recipe name"
                />
              </div>
            </div>

            <div className="ingredients">
              <h3>Ingredients</h3>
              <div className="formGroup">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  list="ingredientList"
                  value={newIngredient.ingredientName}
                  onChange={(e) => {
                    const knownIngredient = ingredients.find(
                      (ingredient) => ingredient.ingredientName === e.target.value
                    );
                    handleIngredientChange("ingredientName", e.target.value);
                    if (knownIngredient) {
                      handleIngredientChange("unit", knownIngredient.unit);
                    }
                  }}
                />
                <datalist id="ingredientList">
                  {ingredients.map((ing, index) => (
                    <option key={index} value={ing.ingredientName} />
                  ))}
                </datalist>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newIngredient.quantity}
                  onChange={(e) => handleIngredientChange("quantity", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={newIngredient.unit}
                  onChange={(e) => handleIngredientChange("unit", e.target.value)}
                  disabled={!!ingredients.find(
                    (ingredient) => ingredient.ingredientName === newIngredient.ingredientName
                  )}
                />
                <button type="button" onClick={addIngredientToRecipe}>
                  Add
                </button>
              </div>
              <ul className="itemList">
                {newRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.unit !== ""
                      ? `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`
                      : `${ingredient.quantity} ${ingredient.ingredientName}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions">
              <h3>Instructions</h3>
              <div className="formGroup">
                <input
                  type="number"
                  placeholder="Minutes"
                  value={newInstruction.minutes}
                  onChange={(e) => handleInstructionChange("minutes", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Instruction"
                  value={newInstruction.text}
                  onChange={(e) => handleInstructionChange("text", e.target.value)}
                />
                <button type="button" onClick={addInstructionToRecipe}>
                  Add
                </button>
              </div>
              <ul className="itemList">
                {newRecipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction.minutes} min: {instruction.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button type="submit">Save</button>
        </form>

        <button
          onClick={() => {
            setNewRecipe({
              recipeName: "",
              author: userName,
              instructions: [],
              ingredients: [],
            });
            setCurrentTab('recipeList');
          }}
        > Cancel
        </button>
      </div>
      )
    </>
  );
};

export default recipeEdit