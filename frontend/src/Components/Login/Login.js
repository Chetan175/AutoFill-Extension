/* global chrome */
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ userData: data, isLoggedIn: true });
      }
      onLoginSuccess();
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSignup) {
    const Signup = require('./Signup').default;
    return <Signup onSignupSuccess={onLoginSuccess} onBackToLogin={() => setShowSignup(false)} />;
  }

  return (
    <div className="login-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120">
  {/* <!-- Document with folded corner and modern styling --> */}
  <g transform="translate(60, 15)">
    {/* <!-- Document base with subtle gradient --> */}
    <defs>
      <linearGradient id="documentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5f9ff" />
        <stop offset="100%" stop-color="#e6f0ff" />
      </linearGradient>
    </defs>
    
    {/* <!-- Main document with shadow effect --> */}
    <rect x="1" y="1" width="48" height="58" rx="3" ry="3" fill="#e0e7ff" opacity="0.5" />
    <rect x="0" y="0" width="48" height="58" rx="3" ry="3" fill="url(#documentGradient)" stroke="#4361ee" stroke-width="1.5" />
    
    {/* <!-- Folded corner with gradient --> */}
    <defs>
      <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#34D399" />
      </linearGradient>
    </defs>
    <path d="M36,0 L48,12 L36,12 Z" fill="url(#cornerGradient)" />
    
    {/* <!-- Document lines with animation effect --> */}
    <line x1="8" y1="20" x2="40" y2="20" stroke="#4361ee" stroke-width="1.5" stroke-linecap="round" />
    <line x1="8" y1="28" x2="40" y2="28" stroke="#4361ee" stroke-width="1.5" stroke-linecap="round" />
    <line x1="8" y1="36" x2="40" y2="36" stroke="#4361ee" stroke-width="1.5" stroke-linecap="round" />
    <line x1="8" y1="44" x2="28" y2="44" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" />
  </g>
  
  {/* <!-- Name with modern typography and subtle effects --> */}
  <g transform="translate(50, 85)">
    {/* <!-- Text shadow for depth --> */}
    <text x="1" y="1" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" letter-spacing="-0.5" fill="#c7d2fe" opacity="0.3">
      Resum<tspan>ate</tspan>
    </text>
    
    {/* <!-- Main text with gradient --> */}
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4361ee" />
        <stop offset="70%" stop-color="#4361ee" />
        <stop offset="70.01%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
    </defs>
    <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" letter-spacing="-0.5" fill="url(#textGradient)">
      Resum<tspan>ate</tspan>
    </text>
  </g>
  
  {/* <!-- Tagline with refined styling --> */}
  <text x="120" y="105" font-family="Arial, Helvetica, sans-serif" font-size="10" text-anchor="middle" fill="#64748B" letter-spacing="0.3">
    Your resume, automatically everywhere
  </text>
</svg>
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue with Resume Parser</p>
        </div>
        
        {errors.general && <div className="error-message">{errors.general}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email"></label>
            <div className="input-container">
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={`form-input ${errors.email ? 'input-error' : ''}`} />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password"></label>
            <div className="input-container">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className={`form-input ${errors.password ? 'input-error' : ''}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowSignup(true); }}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;