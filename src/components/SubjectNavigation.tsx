import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SubjectNavigation: React.FC = () => {
  const location = useLocation();

  const subjects = [
    { name: 'Dashboard', path: '/' },
    { name: 'Social Studies', path: '/social-studies' },
    { name: 'Math', path: '/math' },
    { name: 'Reading', path: '/reading' },
    { name: 'Science', path: '/science' }
  ];

  return (
    <nav className="subject-navigation">
      <ul>
        {subjects.map((subject) => (
          <li key={subject.path}>
            <Link
              to={subject.path}
              className={location.pathname === subject.path ? 'active' : ''}
            >
              {subject.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubjectNavigation; 