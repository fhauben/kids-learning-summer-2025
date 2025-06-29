import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 p-6 border-l-4 ${color}`}
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 mr-3" />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default SubjectCard;