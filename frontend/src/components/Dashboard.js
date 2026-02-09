import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const username = localStorage.getItem('username') || 'Guest';

    useEffect(() => {
        axios.get('http://localhost:8080/api/courses')
            .then(response => setCourses(response.data))
            .catch(err => console.error("Error fetching courses:", err));
    }, []);

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <span className="brand">LearnHub</span>
                <div className="user-nav">
                    <span>Welcome, <strong>{username}</strong></span>
                    <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href='/'; }}>Logout</button>
                </div>
            </nav>

            <div className="content">
                <h2>Available Courses</h2>
                <div className="course-grid">
                    {courses.map(course => (
                        <div key={course.cid} className="course-card">
                            <div className="category-tag">{course.category}</div>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <div className="course-footer">
                                <span>🕒 {course.hours_per_week}h / week</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;