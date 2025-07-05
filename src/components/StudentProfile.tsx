import React, { useState } from 'react';

interface Student {
  name: string;
  grade: number;
  progress: {
    socialStudies: number;
    math: number;
    reading: number;
    science: number;
  };
}

const StudentProfile: React.FC = () => {
  const [student, setStudent] = useState<Student>({
    name: 'Student',
    grade: 5,
    progress: {
      socialStudies: 0,
      math: 0,
      reading: 0,
      science: 0
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(student.name);

  const handleNameSave = () => {
    setStudent(prev => ({ ...prev, name: tempName }));
    setIsEditing(false);
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        {isEditing ? (
          <div className="name-edit">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
            />
            <button onClick={handleNameSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <h2 onClick={() => setIsEditing(true)}>
            Welcome, {student.name}! 👋
          </h2>
        )}
      </div>
      
      <div className="progress-summary">
        <h3>Your Progress</h3>
        <div className="progress-bars">
          <div className="progress-item">
            <span>Social Studies</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${student.progress.socialStudies}%` }}
              ></div>
            </div>
            <span>{student.progress.socialStudies}%</span>
          </div>
          <div className="progress-item">
            <span>Math</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${student.progress.math}%` }}
              ></div>
            </div>
            <span>{student.progress.math}%</span>
          </div>
          <div className="progress-item">
            <span>Reading</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${student.progress.reading}%` }}
              ></div>
            </div>
            <span>{student.progress.reading}%</span>
          </div>
          <div className="progress-item">
            <span>Science</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${student.progress.science}%` }}
              ></div>
            </div>
            <span>{student.progress.science}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 