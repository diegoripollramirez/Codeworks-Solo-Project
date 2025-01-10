import React from 'react'
import { useState } from 'react';


const login = ({ logged, setLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const postForm = async () => {
    let url;
    if (isLogin) {
      url = 'http://localhost:3000/login';
    }else{
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
        throw new Error(`Error HTTP: ${postResponse.status}`);
      }
      const data = await postResponse.json();
      setLogin(data.logged);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postForm();
  };

  return (
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Log in' : 'Register'}</h2>
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
        <button type="submit">{isLogin ? 'Log in' : 'Register'}</button>
      </form>
      <button
        className='toggleButton'
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? 'Switch to Register' : 'Switch to Log in'}
      </button>
    </>
  );
};

export default login