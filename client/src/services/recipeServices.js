'use strict'
const baseURL = 'http://localhost:3000';

// Función para obtener todas las recetas
export const getRecipes = async () => {
  const url = `${baseURL}/recipes`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const postRecipe = async (newRecipe) => {
  const url = `${baseURL}/recipes`;
  try {
    const postResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.error || "An unknown error occurred");
    }
    return await postResponse.json();
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (_id) => {
  const url = `${baseURL}/recipes/${encodeURIComponent(_id)}`;
  try {
    const postResponse = await fetch(url, {
      method: "DELETE",
    });
    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    console.error("Error deleting the recipe:", error);
    throw error;
  }
};