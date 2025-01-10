import React from 'react'
import { useState, useEffect } from 'react';

const shoppingList = ({ selectedMeals }) => {

  const allMeals = selectedMeals.flat()
  let meals = allMeals.filter((recipe) => recipe !== null);
  let ingredients = meals.flatMap((recipe) => recipe.ingredients)



  return (
    <>
      <div>shoppingList</div>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <input type="checkbox" id={`ingredient-${index}`} />
            <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default shoppingList