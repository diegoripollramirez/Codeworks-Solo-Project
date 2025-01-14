import React from 'react'
import { useEffect } from 'react';
import { postSchedule } from './services/userServices';
import { getRecipes } from './services/recipeServices';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Lunch", "Dinner"];

const schedule = ({ userName, recipes, setRecipes, selectedMeals, setSelectedMeals, setCurrentTab, setSearchText }) => {

  const fetchRecipes = async () => {
    try {
      const recipesData = await getRecipes();
      setRecipes(recipesData);
    } catch (error) {
      alert('Failed to load recipes');
    }
  };

  useEffect(() => {
    fetchRecipes();
  });


  const handlePostSchedule = async () => {
    try {
      const response = await postSchedule(userName, selectedMeals);
      alert(response.message || 'Meals saved');
    } catch (error) {
      alert('An error occurred while saving the schedule');
    }
  };

  const handleSetSelectedMeals = (dayIndex, mealIndex, recipe) => {
    setSelectedMeals((prev) => {
      const updatedMeals = [...prev];
      updatedMeals[dayIndex][mealIndex] = recipe;
      return updatedMeals;
    });
  };

  return (
    <>
      <div className='schedule'>
        <h1 >Schedule</h1>
        <ul className='daysCalendar'>
          {DAYS.map((day, dayIndex) => (
            <li className='day' key={day}>
              <h1>{day}</h1>
              {MEALS.map((meal, mealIndex) => (
                <div className='meal' key={`${day}-${meal}`}>
                  <h2>{meal}:</h2>
                  <select className='recipeSelection'
                    value={selectedMeals[dayIndex][mealIndex] ? selectedMeals[dayIndex][mealIndex]._id : ""}
                    onChange={(e) => handleSetSelectedMeals(dayIndex, mealIndex, recipes.find((recipe) => recipe._id === e.target.value))}
                  >
                    <option>Select Recipe</option>
                    {recipes.map((recipe) => (
                      <option key={recipe._id} value={recipe._id}>
                        {recipe.recipeName}
                      </option>
                    ))}
                  </select>
                  <button className='goToRecipeButton'
                    type="button"
                    onClick={() => {
                      const selectedRecipe = recipes.find(recipe => recipe._id === selectedMeals[dayIndex][mealIndex]?._id);
                      if (selectedRecipe) {
                        setSearchText(selectedRecipe.recipeName);
                        setCurrentTab('recipeList');
                      }
                    }}
                  >
                    Go to Recipe
                  </button>
                </div>
              ))}
            </li>
          ))}
        </ul>
        <button className='saveScheduleButton'
          type="button"
          onClick={() => handlePostSchedule()}
        > Save schedule
        </button>
      </div>
    </>
  )
}

export default schedule