import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file for styling

const UserLayout = ({ children, showLogout, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine if current route is home, register, login, or dashboard
  const isHomePage = () => location.pathname === '/';
  const isRegisterPage = () => location.pathname === '/register';
  const isLoginPage = () => location.pathname === '/login';
  const isDashboardPage = () => location.pathname === '/dashboard';

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
          <ul className="nav-links">
            {isHomePage() && (
              <>
                <li>
                  <Link to="/programs" onClick={() => handleLinkClick('Programs')}>
                    Programs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => handleLinkClick('Contact')}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => handleLinkClick('Register')}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={() => handleLinkClick('Login')}>
                    Login
                  </Link>
                </li>
              </>
            )}
            {(isHomePage() || isDashboardPage() || (!isRegisterPage() && !isLoginPage())) && (
              <li>
                <Link to="/dashboard" onClick={() => handleLinkClick('Dashboard')}>
                  Dashboard
                </Link>
              </li>
            )}
            {isDashboardPage() && (
              <>
                <li>
                  <Link to="/programs" onClick={() => handleLinkClick('Programs')}>
                    Programs
                  </Link>
                </li>
                {showLogout && (
                  <li>
                    <Link to="/" onClick={handleLogoutClick}>Logout</Link>
                  </li>
                )}
              </>
            )}
            {(isRegisterPage() || isLoginPage()) && (
              <li>
                <Link to="/" onClick={() => handleLinkClick('Home')}>
                  Home
                </Link>
              </li>
            )}
          </ul>
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

export default UserLayout;
