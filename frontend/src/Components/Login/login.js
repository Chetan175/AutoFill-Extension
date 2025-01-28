import './Login.css'
import React, { useState } from 'react';

function Login_Signup() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('login')}
        >
          Login
        </button>
        <button
          className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('signup')}
        >
          Sign Up
        </button>
      </div>

      <div className="form-container">
        {activeTab === 'login' ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}

const LoginForm = () => {
  return (
    <div className="form">
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input placeholder="Enter your username"></input>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const SignupForm = () => {
  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm your password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Login_Signup;