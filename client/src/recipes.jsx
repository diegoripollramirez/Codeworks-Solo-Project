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

  const postRecipe = async (newRecipe) => {
    const url = "http://localhost:3000/recipes";
    try {
      const postResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRecipe }),
      });
      const data = await postResponse.json();
      setRecipes((prev) => [...prev, data]);
      setEditingMode(false);
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };

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

  const addIngredientToRecipe = (ingredientName, unit, quantity) => {
    const existingIngredient = ingredients.find(
      (ingredient) => ingredient.ingredientName === ingredientName
    );
    if (!existingIngredient) {
      postIngredient(ingredientName, unit);
    }
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, [ingredientName, unit, quantity]],
    }));
  };


  const handleRecipeNameChange = (e) => {
    setNewRecipe((prev) => ({
      ...prev,
      recipeName: e.target.value,
    }));
  };

  const handleInstructionChange = (index, value, field) => {
    setNewRecipe((prev) => {
      const updatedInstructions = [...prev.instructions];
      updatedInstructions[index] = updatedInstructions[index] || {};
      updatedInstructions[index][field] = value;
      return {
        ...prev,
        instructions: updatedInstructions,
      };
    });
  };

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
            <label htmlFor="recipeName">Recipe name</label>
            <input
              type="text"
              name="recipeName"
              value={newRecipe.recipeName}
              onChange={handleRecipeNameChange} // Actualiza el estado correctamente
            />
            <br />
            <label htmlFor="ingredients">Add Ingredients</label>
            <div>
              <input
                type="text"
                placeholder="Ingredient Name"
                list="ingredientList"
                id="ingredientName"
              />
              <datalist id="ingredientList">
                {ingredients.map((ing, index) => (
                  <option key={index} value={ing.ingredientName} />
                ))}
              </datalist>
              <input type="text" placeholder="Unit" id="unit" />
              <input type="number" placeholder="Quantity" id="quantity" />
              <button
                type="button"
                onClick={() =>
                  addIngredientToRecipe(
                    document.getElementById("ingredientName").value,
                    document.getElementById("unit").value,
                    document.getElementById("quantity").value
                  )
                }
              >
                Add Ingredient
              </button>
            </div>
            <ul>
              {newRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient[2]} {ingredient[1]} of {ingredient[0]}
                </li>
              ))}
            </ul>
            <br />
            <label htmlFor="instructions">Instructions</label>
            <div>
              {newRecipe.instructions.map((instruction, index) => (
                <div key={index}>
                  <input
                    type="number"
                    placeholder="Minutes"
                    value={instruction.minutes || ""}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value, "minutes")
                    }
                  />
                  <input
                    type="text"
                    placeholder="Instruction"
                    value={instruction.text || ""}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value, "text")
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewRecipe((prev) => ({
                    ...prev,
                    instructions: [...prev.instructions, { minutes: "", text: "" }],
                  }))
                }
              >
                Add Instruction
              </button>
            </div>
            <br />
            <button type="submit">Save</button>
          </form>
          <button onClick={() => setEditingMode(false)}>Cancel</button>
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
                      {ingredient.quantity} {ingredient.unit} of{" "}
                      {ingredient.ingredientName}
                    </li>
                  ))}
                </ul>
                <h3>Instructions</h3>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
                <button onClick={() => setEditingMode(true)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default recipesSection