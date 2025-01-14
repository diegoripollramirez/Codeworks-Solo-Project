import React from 'react'

const shoppingList = ({ selectedMeals }) => {

  const allMeals = selectedMeals.flat()
  let meals = allMeals.filter((recipe) => recipe && recipe.ingredients);//check if ingredients to avboid bringing the "Select Recipe" recipes
  let ingredients = meals.flatMap((recipe) => recipe.ingredients)

  const grouped = ingredients.reduce((acc, current) => {
    const existing = acc.find(ingredient => ingredient.ingredientName === current.ingredientName);
    if (existing) {
      existing.quantity += Number(current.quantity);
    } else {
      acc.push({ ...current, quantity: Number(current.quantity) });
    }
    return acc;
  }, []);

  return (
    <>
    <h1>Shopping list</h1>
      {grouped.length > 0
        ? <ul className='ingredient'>
          {grouped.map((ingredient, index) => (
            <li key={index}>
              <input type="checkbox" id={`ingredient-${index}`} />
              {ingredient.unit !== ""
                ? `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`
                : ingredient.quantity && ingredient.quantity !== "0"
                  ? `${ingredient.quantity} ${ingredient.ingredientName}`
                  : `${ingredient.ingredientName}`}
            </li>
          ))}
        </ul>
        : <p className='noList'>Add recipes to the calendar to see the needed ingredients.</p>
      }
    </>
  )
}

export default shoppingList