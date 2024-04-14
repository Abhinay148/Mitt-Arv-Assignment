import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logsignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'signup'}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to authenticate');
      }

      const data = await response.json();
      // Handle successful authentication here, e.g., set user data in localStorage
      console.log(data);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h2 className="login-signup-heading">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-signup-form">
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="toggle-button">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={handleToggleForm}>{isLogin ? 'Sign up here' : 'Login here'}</span>
        </p>
      </div>
    </div>
  );
};

export default Logsignup;
