'use strict'
const baseURL = 'http://localhost:3000';

export const getIngredients = async () => {
  const url = `${baseURL}/ingredients`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const postIngredient = async (ingredientName, unit) => {
  const url = `${baseURL}/ingredients`;
  try {
    const postResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientName, unit }),
    });
    return await postResponse.json();
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw error;
  }
};