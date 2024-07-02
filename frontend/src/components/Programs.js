// src/components/Programs.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Programs.css';
import { format, isValid } from 'date-fns';

const Programs = () => {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="programs-container">
        <h2>Programs</h2>
        {Object.keys(courses).map(program => (
          <div key={program} className="program">
            <h3>{program}</h3>
            <div className="courses">
              {courses[program].map(course => (
                <div key={course.id} className="course-card">
                  <img src={course.image} alt={course.title} />
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <p className="price">Price: {course.price}</p>
                  <p>Duration: {course.duration}</p>
                  <p className="start-date">
                    Start Date: {isValid(new Date(course.startdate)) ? format(new Date(course.startdate), 'yyyy-MM-dd') : 'Invalid Date'}
                  </p>
                  <button className="enroll-button" onClick={() => handleEnrollClick(course.id)}>Enroll</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Programs;
