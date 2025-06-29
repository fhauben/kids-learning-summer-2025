import React from 'react';
import { GradeLevel } from '../types';
import { GraduationCap } from 'lucide-react';

interface GradeSelectorProps {
  selectedGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade, onGradeChange }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-white rounded-xl shadow-md p-2 flex items-center space-x-2">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <button
          onClick={() => onGradeChange('3rd')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedGrade === '3rd'
              ? 'bg-blue-600 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:bg-blue-50'
          }`}
        >
          3rd Grade
        </button>
        <button
          onClick={() => onGradeChange('5th')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedGrade === '5th'
              ? 'bg-blue-600 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:bg-blue-50'
          }`}
        >
          5th Grade
        </button>
      </div>
    </div>
  );
};

export default GradeSelector;