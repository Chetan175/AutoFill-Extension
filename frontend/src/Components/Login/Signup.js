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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
        {/* <!-- Background --> */}
        <rect width="400" height="250" fill="#ffffff" rx="10" ry="10"/>
        
        {/* <!-- Main logo text --> */}
        <text x="200" y="120" font-family="Arial, sans-serif" font-weight="bold" font-size="48" text-anchor="middle" fill="#2563EB">
          Resum<tspan fill="#10B981">ate</tspan>
        </text>
        
        {/* <!-- Document icon --> */}
        <g transform="translate(150, 60)">
          <path d="M10,0 L70,0 L100,30 L100,140 L10,140 Z" fill="#f0f9ff" stroke="#2563EB" stroke-width="3"/>
          <path d="M70,0 L70,30 L100,30" fill="none" stroke="#2563EB" stroke-width="3"/>
          
          {/* <!-- Document lines --> */}
          <line x1="30" y1="50" x2="80" y2="50" stroke="#10B981" stroke-width="3"/>
          <line x1="30" y1="70" x2="80" y2="70" stroke="#2563EB" stroke-width="3"/>
          <line x1="30" y1="90" x2="80" y2="90" stroke="#2563EB" stroke-width="3"/>
          <line x1="30" y1="110" x2="60" y2="110" stroke="#10B981" stroke-width="3"/>
        </g>
        
        {/* <!-- Cursor icon --> */}
        <g transform="translate(225, 90)">
          <path d="M0,0 L15,15 L30,0 L20,0 L15,5 L10,0 Z" fill="#10B981"/>
          <line x1="15" y1="5" x2="15" y2="30" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
        </g>
        
        {/* <!-- Tagline --> */}
        <text x="200" y="170" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#64748B">
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