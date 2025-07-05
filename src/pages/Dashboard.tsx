import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const subjects = [
    {
      name: 'Social Studies',
      path: '/social-studies',
      description: 'Learn about states, capitals, and American history',
      icon: '🗺️',
      color: '#4CAF50'
    },
    {
      name: 'Math',
      path: '/math',
      description: 'Practice math skills and problem solving',
      icon: '🔢',
      color: '#2196F3'
    },
    {
      name: 'Reading',
      path: '/reading',
      description: 'Improve reading comprehension and vocabulary',
      icon: '📚',
      color: '#FF9800'
    },
    {
      name: 'Science',
      path: '/science',
      description: 'Explore science concepts and experiments',
      icon: '🔬',
      color: '#9C27B0'
    }
  ];

  return (
    <div className="dashboard">
      <h2>Welcome to Summer Learning!</h2>
      <p>Choose a subject to start learning:</p>
      
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <Link key={subject.path} to={subject.path} className="subject-card">
            <div className="subject-icon" style={{ backgroundColor: subject.color }}>
              <span>{subject.icon}</span>
            </div>
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
          </Link>
        ))}
      </div>
      
      <div className="dashboard-tips">
        <h3>💡 Learning Tips</h3>
        <ul>
          <li>Take breaks every 20-30 minutes</li>
          <li>Try to complete at least one activity per day</li>
          <li>Ask questions when you need help</li>
          <li>Have fun while learning!</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 