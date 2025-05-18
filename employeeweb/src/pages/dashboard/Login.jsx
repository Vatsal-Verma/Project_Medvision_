// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials for the demo
    const adminUsername = 'admin';
    const adminPassword = 'super123';

    if (username === adminUsername && password === adminPassword) {
      // Store login state in localStorage or state
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/doctor');  // Redirect to the homepage or dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
