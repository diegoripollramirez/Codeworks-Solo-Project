import React from 'react'
import { useState } from 'react';
import { loginRegister, getSchedule } from './services/userServices';

const login = ({ setLogin, userName, setUserName, setSelectedMeals }) => {
  const [loginOrRegister, setloginOrRegister] = useState(true);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = loginOrRegister
      ? 'http://localhost:3000/login'
      : 'http://localhost:3000/register';

    try {
      const data = await loginRegister(url, userName, password);
      setLogin(data.logged);

      const schedule = await getSchedule(userName);
      setSelectedMeals(schedule);
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
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