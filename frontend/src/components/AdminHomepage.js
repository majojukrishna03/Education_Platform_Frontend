import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Reuse the CSS file for styling

const AdminHome = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await fetch('http://13.60.205.99:5000/api/admin-count');
        if (!response.ok) {
          throw new Error(`Failed to fetch admin count: ${response.statusText}`);
        }
        const data = await response.text(); // Read response as plain text
        setAdminCount(parseInt(data)); // Convert plain text to integer
      } catch (error) {
        console.error('Error fetching admin count:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminCount();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Admin Portal</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {adminCount < 1 && <li><Link to="/admin/register">Register</Link></li>}
            <li><Link to="/admin/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="hero">
        <div className="hero-content">
          <h2>Welcome to the Admin Portal</h2>
          <p>Create courses, manage and review applications effectively!</p>
          <div className="cta-buttons">
            {adminCount < 1 && <Link to="/admin/register" className="cta-button">Register</Link>}
            <Link to="/admin/login" className="cta-button">Login</Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Education Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminHome;
