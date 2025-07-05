import React, { useState } from 'react';

interface GradeToggleProps {
  onGradeChange?: (grade: number) => void;
}

const GradeToggle: React.FC<GradeToggleProps> = ({ onGradeChange }) => {
  const [currentGrade, setCurrentGrade] = useState(5);

  const handleGradeChange = (grade: number) => {
    setCurrentGrade(grade);
    onGradeChange?.(grade);
  };

  return (
    <div className="grade-toggle">
      <h3>Select Your Grade:</h3>
      <div className="grade-buttons">
        <button
          className={`grade-btn ${currentGrade === 3 ? 'active' : ''}`}
          onClick={() => handleGradeChange(3)}
        >
          3rd Grade
        </button>
        <button
          className={`grade-btn ${currentGrade === 5 ? 'active' : ''}`}
          onClick={() => handleGradeChange(5)}
        >
          5th Grade
        </button>
      </div>
    </div>
  );
};

export default GradeToggle; 