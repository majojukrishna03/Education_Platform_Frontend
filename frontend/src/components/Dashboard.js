import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserLayout from './Layout';
import './Dashboard.css';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Fetch dashboard data (message)
        const response = await fetch('https://education-platform-backend.onrender.com/api/dashboard', {
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

        // Fetch enrolled courses from payments table
        const enrolledCoursesResponse = await fetch('https://education-platform-backend.onrender.com/api/dashboard/enrolled-courses', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (enrolledCoursesResponse.ok) {
          const coursesData = await enrolledCoursesResponse.json();
          // console.log(coursesData)
          if (coursesData.enrolledCourses && coursesData.enrolledCourses.length > 0) {
            setEnrolledCourses(coursesData.enrolledCourses);
          } else {
            setEnrolledCourses(null);
          }
        } else {
          console.error('Error fetching enrolled courses:', enrolledCoursesResponse.statusText);
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
    <UserLayout>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>{message}</p>
          
          {/* Display enrolled courses if available */}
          {enrolledCourses && (
            <div className="enrolled-courses">
              <h3>Enrolled Courses</h3>
              <table className="course-table">
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.courseid}</td>
                      <td>{course.coursename}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="dashboard-links">
            <Link to="/dashboard/track-application">Track Application</Link><br />
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
