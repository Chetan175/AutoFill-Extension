/* global chrome */

import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignupSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//         return;
//     }

//     setIsLoading(true);

//     try {
//         const response = await fetch("http://localhost:5000/user/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 password: formData.password
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.error || "Signup failed");
//         }

//         // Use Chrome storage for persistence
//         if (typeof chrome !== "undefined" && chrome.storage) {
//             chrome.storage.local.set({ userData: data, isLoggedIn: true }, () => {
//                 console.log("User registered and logged in");
//             });
//         }

//         onSignupSuccess();
//     } catch (error) {
//         console.error("Signup error:", error);
//         setErrors({ general: error.message });
//     } finally {
//         setIsLoading(false);
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
      return;
  }

  setIsLoading(true);

  try {
      const response = await fetch("http://localhost:5000/user/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password
          })
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error || "Signup failed");
      }

      console.log("Signup successful:", data);
      alert("Account created successfully! Please log in.");
      onBackToLogin(); // ✅ Redirect to login

  } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: error.message });
  } finally {
      setIsLoading(false);
  }
};



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
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
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Sign up to use Resume Parser</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <div className="form-group">
            <label htmlFor="fullName"></label>
            <div className="input-container">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'input-error' : ''}
              />
              <span className="input-icon"></span>
            </div>
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email"></label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'input-error' : ''}
              />
              <span className="input-icon"></span>
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password"></label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'input-error' : ''}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword"></label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              <span className="input-icon"></span>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>
          
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <a href="#" onClick={onBackToLogin}>Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;