import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Userlayout from './Layout';
import './Dashboard.css';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          console.error('Error fetching dashboard data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout successful');
    navigate('/', { replace: true });
  };

  return (
    <Userlayout>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>{message}</p>
          <div className="dashboard-links">
            <Link to="/dashboard/track-application">Track Application</Link><br />
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </Userlayout>
  );
};

export default Dashboard;
