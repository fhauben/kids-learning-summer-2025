import React, { useEffect, useState } from 'react';
import { X, Trophy, Star, Zap, Flame } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

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
  const [showScore, setShowScore] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [modalScale, setModalScale] = useState(0.8);
  const [modalOpacity, setModalOpacity] = useState(0);
  
  const { playCorrect, playAchievement, playLevelUp } = useSoundEffects();

  useEffect(() => {
    if (isOpen) {
      // Initial animation
      setModalScale(0.8);
      setModalOpacity(0);
      
      // Animate modal in
      setTimeout(() => {
        setModalScale(1);
        setModalOpacity(1);
      }, 100);

      // Play appropriate sound
      const percentage = Math.round((score / total) * 100);
      if (percentage === 100) {
        playAchievement();
      } else if (percentage >= 80) {
        playLevelUp();
      } else {
        playCorrect();
      }

      // Staggered animations
      setTimeout(() => setShowConfetti(true), 200);
      setTimeout(() => setShowScore(true), 500);
      setTimeout(() => setShowProgress(true), 800);
      setTimeout(() => setShowStars(true), 1000);
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Reset states when closing
      setShowConfetti(false);
      setShowStars(false);
      setShowScore(false);
      setShowProgress(false);
      setModalScale(0.8);
      setModalOpacity(0);
    }
  }, [isOpen, onClose, score, total, playCorrect, playAchievement, playLevelUp]);

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
      {/* Enhanced Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  Math.random() > 0.5 ? 'bg-yellow-400' : 
                  Math.random() > 0.5 ? 'bg-pink-400' : 
                  Math.random() > 0.5 ? 'bg-blue-400' : 'bg-green-400'
                }`}
                style={{
                  animation: `spin ${2 + Math.random() * 2}s linear infinite`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Stars Animation */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
            >
              {['⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Modal */}
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-500 ease-out"
        style={{
          transform: `scale(${modalScale})`,
          opacity: modalOpacity,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with enhanced animation */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className={`transform transition-all duration-700 ${showScore ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              {getScoreIcon()}
            </div>
          </div>
          <h2 className={`text-3xl font-bold text-gray-800 mb-2 transform transition-all duration-700 ${showScore ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {getScoreMessage()}
          </h2>
          <p className={`text-gray-600 transform transition-all duration-700 delay-200 ${showScore ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {message || "You completed this activity!"}
          </p>
        </div>

        {/* Enhanced Score Display */}
        <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 transform transition-all duration-700 delay-300 ${showScore ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2 transform transition-all duration-1000 delay-500 ${showScore ? 'scale-100' : 'scale-0'}`}>
              {score}/{total}
            </div>
            <div className={`text-2xl font-semibold text-gray-700 transform transition-all duration-700 delay-600 ${showScore ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              {percentage}%
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1500 ease-out ${
                  isPerfect ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  isGreat ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  isGood ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ 
                  width: showProgress ? `${percentage}%` : '0%',
                  boxShadow: showProgress ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Streak Display */}
        {showStreak && streakCount > 0 && (
          <div className={`bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 transform transition-all duration-700 delay-700 ${showScore ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500 mr-2 animate-pulse" />
              <span className="text-lg font-semibold text-orange-700">
                {streakCount} Day{streakCount > 1 ? 's' : ''} Streak!
              </span>
            </div>
          </div>
        )}

        {/* Enhanced Motivational Message */}
        <div className={`text-center transform transition-all duration-700 delay-800 ${showScore ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {isPerfect && (
            <p className="text-green-600 font-semibold animate-pulse">
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

        {/* Enhanced Continue Button */}
        <button
          onClick={onClose}
          className={`w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg transform transition-all duration-700 delay-900 ${showScore ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          Continue Learning! 🚀
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;