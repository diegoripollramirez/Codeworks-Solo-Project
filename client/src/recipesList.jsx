import React from 'react'
import { deleteRecipe } from './services/recipeServices';

const recipeList = ({ setCurrentTab, recipes, setRecipes, searchText, setSearchText }) => {

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleButtonClick = (tab) => {
    setCurrentTab(tab);
    setSearchText('');
  }

  const deleteRecipeById = async (_id) => {
    try {
      await deleteRecipe(_id);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== _id));
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
  };

  return (
    <>
      <div className="RecipeList">

        <h1>List of Recipes</h1>

        <input className='searchField'
          type="text"
          placeholder="Search recipe"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button className='newRecipeButton' onClick={() => handleButtonClick('recipeEdit')}>New Recipe</button>

        <ul>
          {filteredRecipes.map((recipe, index) => (
            <li className="recipe" key={index}>
              <h2>{recipe.recipeName}</h2>
              <div className="recipeContent">

                <div className="ingredientsSection">
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
                </div>

                <div className="instructionsSection">
                  <h3>Instructions</h3>
                  <ol>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>
                        {instruction.minutes} minutes: {instruction.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <button
                className="deleteRecipeButton"
                onClick={() => {
                  deleteRecipeById(recipe._id);
                }}
              >Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default recipeList