import React, { useEffect, useState } from 'react';
import { X, Trophy, Star, Zap, Flame } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  message?: string;
  showStreak?: boolean;
  streakCount?: number;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  score,
  total,
  message,
  showStreak = false,
  streakCount = 0
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowStars(true), 500);
      
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const percentage = Math.round((score / total) * 100);
  const isPerfect = percentage === 100;
  const isGreat = percentage >= 80;
  const isGood = percentage >= 60;

  const getScoreMessage = () => {
    if (isPerfect) return "Perfect Score! 🎯";
    if (isGreat) return "Excellent Work! 🌟";
    if (isGood) return "Great Job! 👍";
    return "Keep Trying! 💪";
  };

  const getScoreColor = () => {
    if (isPerfect) return "text-yellow-500";
    if (isGreat) return "text-green-500";
    if (isGood) return "text-blue-500";
    return "text-orange-500";
  };

  const getScoreIcon = () => {
    if (isPerfect) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (isGreat) return <Star className="w-8 h-8 text-green-500" />;
    if (isGood) return <Zap className="w-8 h-8 text-blue-500" />;
    return <Flame className="w-8 h-8 text-orange-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Stars Animation */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {getScoreIcon()}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {getScoreMessage()}
          </h2>
          <p className="text-gray-600">
            {message || "You completed this activity!"}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{total}
            </div>
            <div className="text-2xl font-semibold text-gray-700">
              {percentage}%
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  isPerfect ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  isGreat ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  isGood ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Streak Display */}
        {showStreak && streakCount > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500 mr-2" />
              <span className="text-lg font-semibold text-orange-700">
                {streakCount} Day{streakCount > 1 ? 's' : ''} Streak!
              </span>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="text-center">
          {isPerfect && (
            <p className="text-green-600 font-semibold">
              🎉 You're a learning superstar! 🎉
            </p>
          )}
          {isGreat && (
            <p className="text-blue-600 font-semibold">
              🌟 Almost perfect! Keep up the great work!
            </p>
          )}
          {isGood && (
            <p className="text-orange-600 font-semibold">
              👍 Good progress! Practice makes perfect!
            </p>
          )}
          {!isGood && (
            <p className="text-purple-600 font-semibold">
              💪 Don't give up! Every attempt makes you stronger!
            </p>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          Continue Learning! 🚀
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;