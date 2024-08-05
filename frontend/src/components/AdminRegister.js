// src/components/AdminRegister.js
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import './Register.css'; // Reuse the CSS file for registration page

const AdminRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Prepare data for submission
    const formData = {
      fullName,
      email,
      password,
    };

    try {
      // Send POST request to backend API
      const response = await fetch('https://education-platform-backend.onrender.com/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        alert('Registration successful!');
        window.location.href = '/admin/home';
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <AdminLayout>
      <div className="registration-container">
        <div className="registration-card">
          <h2>Admin Registration Form</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRegister;
