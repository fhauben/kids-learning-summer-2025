import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 p-4 border-l-4 ${color}`}
    >
      <div className="flex items-center mb-2">
        <Icon className="w-6 h-6 mr-2" />
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ActivityCard;