import React from 'react'
import { useState, useEffect } from 'react';

const shoppingList = ({ selectedMeals }) => {

  const allMeals = selectedMeals.flat()
  let meals = allMeals.filter((recipe) => recipe && recipe.ingredients);//check if ingredients to avboid bringing the "Select Recipe" recipes
  let ingredients = meals.flatMap((recipe) => recipe.ingredients)


  return (
    <>
      {ingredients.length > 0
        ? <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <input type="checkbox" id={`ingredient-${index}`} />
              <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
            </li>
          ))}
        </ul>
        : <p>Add recipes to the calendar to see the needed ingredients.</p>
      }
    </>
  )
}

export default shoppingList