'use strict'
const baseURL = 'http://localhost:3000';

export const loginRegister = async (url, userName, password) => {
  try {
    const postResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.error || 'An unknown error occurred');
    }
    return await postResponse.json();
  } catch (error) {
    console.error('Error during login/register:', error);
    throw error;
  }
};

export const getSchedule = async (userName) => {
  const url = `${baseURL}/schedule/${encodeURIComponent(userName)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    return await response.json();
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

export const postSchedule = async (userName, selectedMeals) => {
  const url = `${baseURL}/schedule/${encodeURIComponent(userName)}`;
  try {
    const postResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedMeals }),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.error || 'An unknown error occurred');
    }

    return await postResponse.json();
  } catch (error) {
    console.error('Error saving the schedule:', error);
    throw error;
  }
};