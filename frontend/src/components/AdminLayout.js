// AdminLayout.js

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file for styling

const AdminLayout = ({ children, showLogout, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine current route
  const isAdminHomePage = () => location.pathname === '/admin';
  const isAdminDashboardPage = () => location.pathname === '/admin/dashboard';

  // Function to handle link clicks with alert
  const handleLinkClick = (pageName) => {
    alert(`Redirecting to ${pageName} page.`);
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    handleLogout(); // Perform logout actions (clear token, etc.)
    alert('Redirecting to home page.');
    navigate('/'); // Redirect to home page using navigate
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
          {isAdminHomePage() && (
            <ul className="nav-links">
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              {showLogout && (
                <li>
                  <Link to="/" onClick={handleLogoutClick}>Logout</Link>
                </li>
              )}
            </ul>
          )}
          {isAdminDashboardPage() && (
            <ul className="nav-links">
              {showLogout && (
                <li>
                  <Link to="/admin/logout" onClick={handleLogoutClick}>Logout</Link>
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Education Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
