import React from 'react'
import { useEffect, useState } from 'react';

const recipesSection = ({ userName, recipes, setRecipes }) => {
  const [editingMode, setEditingMode] = useState(false);
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

  const postRecipe = async (newRecipe) => {
    const existingRecipe = recipes.find(
      (recipe) => recipe.recipeName === newRecipe.recipeName
    );
    if (existingRecipe) {
      alert("Recipe with this name already exists!");
      return;
    }

    const url = "http://localhost:3000/recipes";
    try {
      const postResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        alert(`Error: ${errorData.error || 'An unknown error occurred'}`);
        return;
      }
      const data = await postResponse.json();
      setRecipes((prev) => [...prev, data]);
      setEditingMode(false);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  // Need an ingredients list to sum their amounts and avoid same ingredient with diferent names (spaghetti, spagheti,spagetti) or different units (grams, g., kg)
  const getIngredients = async () => {
    const url = 'http://localhost:3000/ingredients';
    try {
      const response = await fetch(url);
      const result = await response.json();
      setIngredients(result);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };
  useEffect(() => {
    getIngredients();
  }, []);

  const postIngredient = async (ingredientName, unit) => {
    const url = "http://localhost:3000/ingredients";
    try {
      const postResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientName, unit }),
      });
      const data = await postResponse.json();
      setIngredients((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };

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

  const deleteRecipes = async (_id) => {
    const url = `http://localhost:3000/recipes/${encodeURIComponent(_id)}`;
    try {
      const postResponse = await fetch(url, {
        method: "DELETE",
      });
      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        alert(`Error: ${errorData.error || 'An unknown error occurred'}`);
        return;
      }
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== _id));
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
  }

  return (
    <>
      {editingMode ? (
        <div className="newRecipe">
          <h1>Insert or Edit Recipe</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postRecipe(newRecipe);
            }}
          >

            <br />

            <div className="recipeName">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="recipeName"
                value={newRecipe.recipeName}
                onChange={addNameToRecipe}
              />
            </div>

            <br />

            <div className="ingredients">
              <label htmlFor="ingredients">Ingredients</label>

              <input
                type="text"
                placeholder="Ingredient name"
                list="ingredientList"
                id="ingredientName"
                value={newIngredient.ingredientName}
                onChange={(e) => {
                  const knownIngredient = ingredients.find(ingredient => ingredient.e.target.value === e.target.value);
                  handleIngredientChange("ingredientName", e.target.value);
                  if (knownIngredient) { handleIngredientChange("unit", knownIngredient.unit); }//set unit here to disable the field if known ingredient
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
                id="quantity"
                value={newIngredient.quantity}
                onChange={(e) => handleIngredientChange("quantity", e.target.value)}
              />

              <input
                type="text"
                placeholder="Unit of measurement"
                id="unit"
                value={
                  ingredients.find(ingredient => ingredient.ingredientName === newIngredient.ingredientName)
                    ? ingredients.find(ingredient => ingredient.ingredientName === newIngredient.ingredientName).unit
                    : newIngredient.unit
                }
                onChange={(e) => handleIngredientChange("unit", e.target.value)}
                disabled={!!ingredients.find(ingredient => ingredient.ingredientName === newIngredient.ingredientName)}
              />

              <button
                type="button"
                onClick={() => addIngredientToRecipe()}
              > Add Ingredient
              </button>

              <ul>
                {newRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.unit !== ""
                      ? `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`
                      : `${ingredient.quantity} ${ingredient.ingredientName}`}
                  </li>
                ))}
              </ul>
            </div>

            <br />

            <div className="instructions">
              <label htmlFor="instructions">Instructions</label>
              <input
                type="number"
                placeholder="Minutes"
                id="minutes"
                value={newInstruction.minutes}
                onChange={(e) => handleInstructionChange("minutes", e.target.value)}
              />

              <input
                type="text"
                placeholder="Text"
                id="text"
                value={newInstruction.text}
                onChange={(e) => handleInstructionChange("text", e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  addInstructionToRecipe()
                }
              > Add Instruction
              </button>

              <ul>
                {newRecipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction.minutes} minutes: {instruction.text}
                  </li>
                ))}
              </ul>
            </div>

            <br />

            <button type="submit">Save</button>
          </form>

          <button onClick={() => {
            setNewRecipe({
              recipeName: "",
              author: userName,
              instructions: [],
              ingredients: [],
            });
            setEditingMode(false)
          }}>Cancel</button>
        </div>
      ) : (
        <div className="RecipeList">
          <h1>List of Recipes</h1>
          <button onClick={() => setEditingMode(true)}>New Recipe</button>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h2>{recipe.recipeName}</h2>
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.unit !== ""
                        ? `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`
                        : `${ingredient.quantity} ${ingredient.ingredientName}`}
                    </li>
                  ))}
                </ul>
                <h3>Instructions</h3>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>
                      {instruction.minutes} minutes: {instruction.text}
                    </li>
                  ))}
                </ol>

                <button onClick={() => { deleteRecipes(recipe._id) }
                }>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default recipesSection