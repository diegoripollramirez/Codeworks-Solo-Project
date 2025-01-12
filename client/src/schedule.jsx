import React from 'react'
import { useState, useEffect } from 'react';

const schedule = ({ userName, recipes, setRecipes, selectedMeals, setSelectedMeals }) => {


  const getRecipes = async () => {
    const url = 'http://localhost:3000/recipes';
    try {
      const response = await fetch(url);
      const result = await response.json();
      setRecipes(result);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const getSchedule = async () => {
    const url = `http://localhost:3000/schedule/${encodeURIComponent(userName)}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setSelectedMeals(result);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  useEffect(() => {
    getRecipes();
    getSchedule();
  }, []);

  const postSchedule = async () => {
    const url = `http://localhost:3000/schedule/${encodeURIComponent(userName)}`;
    try {
      const postResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedMeals }),
      });
      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        alert(`Error: ${errorData.error || "An unknown error occurred"}`);
        return;
      }

      const data = await postResponse.json();
      alert(data.message || "Meals saved");
    } catch (error) {
      console.error("Error saving the schedule:", error);
      alert("An unexpected error occurred while saving the schedule.");
    }
  };


  const handleSetSelectedMeals = (dayIndex, mealIndex, recipe) => {
    setSelectedMeals((prev) => {
      const updatedMeals = [...prev];
      updatedMeals[dayIndex][mealIndex] = recipe;
      return updatedMeals;
    });
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["lunch", "dinner"];

  return (
    <>
      <ul className='daysCalendar'>
        {days.map((day, dayIndex) => (
          meals.map((meal, mealIndex) => (
            <li key={`${day}-${meal}`}>
              <h1>{day}</h1>
              <div>
                <h2>{meal}: </h2>
                <select
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
              </div>
            </li>
          ))
        ))}
      </ul>
      <button
        type="button"
        onClick={() => postSchedule()}
      > Save schedule
      </button>
    </>
  )
}

export default schedule