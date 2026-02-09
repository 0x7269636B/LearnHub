import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const username = localStorage.getItem('username') || 'Admin';

    useEffect(() => {
        // Κλήση στο Spring Boot API
        axios.get('http://localhost:8080/api/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="dashboard">
            <nav className="nav">
                <h2>LearnHub</h2>
                <div>
                    <span>Welcome, <b>{username}</b></span>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="main-content">
                <h3>Available Courses</h3>
                <div className="grid">
                    {courses.map(c => (
                        <div key={c.cid} className="card">
                            <span className="tag">{c.category}</span>
                            <h4>{c.title}</h4>
                            <p>{c.description}</p>
                            <small>⏱ {c.hours_per_week}h/week</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;