import React from 'react'
import { useState } from 'react';


const login = ({ setLogin, userName, setUserName, setSelectedMeals }) => {
  const [loginOrRegister, setloginOrRegister] = useState(true);
  const [password, setPassword] = useState("");

  const postForm = async () => {
    let url;
    if (loginOrRegister) {
      url = 'http://localhost:3000/login';
    } else {
      url = 'http://localhost:3000/register';
    }
    try {
      const postResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });
      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        alert(`Error: ${errorData.error || 'An unknown error occurred'}`);
      }
      const data = await postResponse.json();
      setLogin(data.logged);
      await getSchedule();
    } catch (error) {
      console.error('Error:', error);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postForm();

  };

  const handleToggleMode = (event) => {
    event.preventDefault();
    setloginOrRegister((prev) => !prev);
  };

  return (
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
        <h2>{loginOrRegister ? 'Log in' : 'Register'}</h2>
        <div className='user'>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className='password'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{loginOrRegister ? 'Log in' : 'Register'}</button>
        <button
          className='toggleButton'
          onClick={handleToggleMode}
        >
          {loginOrRegister ? 'Create account' : 'Already registered'}
        </button>
      </form>

    </>
  );
};

export default login