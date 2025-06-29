import React, { useState } from 'react';
import { Clock, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { clockTimes } from '../../../data/mathProblems';

interface AnalogClockProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

// Utility function to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Purple Flying Bunny Success Modal Component
const PurpleFlyingBunnyModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main bunny animation */}
        <div className="animate-bounce">
          <div className="text-9xl animate-pulse filter drop-shadow-lg">🐰</div>
        </div>
        
        {/* Flying motion trail */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse opacity-60"></div>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-pulse opacity-40 mt-1" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent animate-pulse opacity-30 mt-1" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Success message */}
        <div className="text-center mt-6">
          <div className="text-4xl font-bold text-purple-600 animate-pulse mb-2">
            ⏰ PERFECT TIME! ⏰
          </div>
          <div className="text-2xl font-semibold text-purple-700 animate-bounce">
            Time Master!
          </div>
        </div>
        
        {/* Floating stars and time symbols around the bunny */}
        <div className="absolute -top-8 -left-8 text-yellow-400 text-4xl animate-ping">⭐</div>
        <div className="absolute -top-4 -right-6 text-pink-300 text-3xl animate-ping" style={{ animationDelay: '0.2s' }}>✨</div>
        <div className="absolute -bottom-6 -left-4 text-yellow-500 text-3xl animate-ping" style={{ animationDelay: '0.4s' }}>⏰</div>
        <div className="absolute -bottom-8 -right-8 text-purple-400 text-4xl animate-ping" style={{ animationDelay: '0.6s' }}>🕐</div>
        <div className="absolute top-2 -left-12 text-pink-300 text-2xl animate-ping" style={{ animationDelay: '0.8s' }}>⭐</div>
        <div className="absolute top-4 -right-10 text-purple-500 text-2xl animate-ping" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute -bottom-2 left-8 text-yellow-400 text-3xl animate-ping" style={{ animationDelay: '1.2s' }}>🕒</div>
        <div className="absolute -bottom-4 right-6 text-purple-300 text-2xl animate-ping" style={{ animationDelay: '1.4s' }}>⏱️</div>
        
        {/* Additional purple heart accents */}
        <div className="absolute top-8 left-12 text-purple-400 text-2xl animate-spin">💜</div>
        <div className="absolute bottom-12 right-4 text-purple-300 text-3xl animate-spin" style={{ animationDelay: '0.5s' }}>💜</div>
        <div className="absolute top-12 right-12 text-purple-500 text-2xl animate-spin" style={{ animationDelay: '1s' }}>💜</div>
        
        {/* Celebration confetti with time theme */}
        <div className="absolute -top-16 left-0 text-purple-400 text-2xl animate-bounce">🎊</div>
        <div className="absolute -top-12 right-2 text-pink-400 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎉</div>
        <div className="absolute -bottom-16 left-4 text-indigo-400 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎊</div>
        <div className="absolute -bottom-12 right-0 text-violet-400 text-2xl animate-bounce" style={{ animationDelay: '0.9s' }}>🎉</div>
        
        {/* Bunny ears effect */}
        <div className="absolute -top-6 left-8 text-pink-300 text-xl animate-wiggle">👂</div>
        <div className="absolute -top-6 right-8 text-pink-300 text-xl animate-wiggle" style={{ animationDelay: '0.3s' }}>👂</div>
        
        {/* Purple glow effect */}
        <div className="absolute inset-0 bg-purple-400 rounded-full opacity-20 animate-ping scale-150"></div>
        <div className="absolute inset-0 bg-purple-300 rounded-full opacity-10 animate-ping scale-200" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating carrots for bunny theme */}
        <div className="absolute top-16 -left-6 text-orange-400 text-xl animate-bounce">🥕</div>
        <div className="absolute top-20 -right-4 text-orange-500 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🥕</div>
        <div className="absolute -bottom-20 left-8 text-orange-400 text-xl animate-bounce" style={{ animationDelay: '0.8s' }}>🥕</div>
      </div>
      
      {/* Click anywhere to close */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

const AnalogClock: React.FC<AnalogClockProps> = ({ onBack, onSaveProgress }) => {
  const [shuffledClockTimes] = useState(() => shuffleArray(clockTimes));
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentTime = shuffledClockTimes[currentTimeIndex];
  const wrongAnswers = shuffledClockTimes
    .filter(time => time.display !== currentTime.display)
    .map(time => time.display)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const allOptions = [currentTime.display, ...wrongAnswers].sort(() => Math.random() - 0.5);

  const drawClock = (hour: number, minute: number) => {
    const hourAngle = ((hour % 12) * 30) + (minute * 0.5) - 90;
    const minuteAngle = (minute * 6) - 90;
    
    return (
      <svg width="200" height="200" className="mx-auto">
        <circle cx="100" cy="100" r="90" fill="white" stroke="#374151" strokeWidth="4" />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) - 90;
          const x1 = 100 + 75 * Math.cos(angle * Math.PI / 180);
          const y1 = 100 + 75 * Math.sin(angle * Math.PI / 180);
          const x2 = 100 + 85 * Math.cos(angle * Math.PI / 180);
          const y2 = 100 + 85 * Math.sin(angle * Math.PI / 180);
          
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth="2" />
              <text
                x={100 + 65 * Math.cos(angle * Math.PI / 180)}
                y={100 + 65 * Math.sin(angle * Math.PI / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-gray-700"
              >
                {i === 0 ? 12 : i}
              </text>
            </g>
          );
        })}
        
        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 50 * Math.cos(hourAngle * Math.PI / 180)}
          y2={100 + 50 * Math.sin(hourAngle * Math.PI / 180)}
          stroke="#374151"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos(minuteAngle * Math.PI / 180)}
          y2={100 + 70 * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="#374151"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle cx="100" cy="100" r="6" fill="#374151" />
      </svg>
    );
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentTime.display) {
      setScore(score + 1);
      setShowSuccessModal(true);
      
      // Hide success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
    
    setTimeout(() => {
      setAnsweredQuestions(answeredQuestions + 1);
      if (currentTimeIndex < shuffledClockTimes.length - 1) {
        setCurrentTimeIndex(currentTimeIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentTimeIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowSuccessModal(false);
  };

  if (answeredQuestions === shuffledClockTimes.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, shuffledClockTimes.length);
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Math
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Time Master!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {shuffledClockTimes.length}!
          </p>
          <div className="mb-6">
            <div className="text-lg font-semibold text-blue-600">
              Accuracy: {Math.round((score / shuffledClockTimes.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              You practiced reading {shuffledClockTimes.length} different clock times!
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again with New Random Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Math
      </button>

      {/* Purple Flying Bunny Success Modal */}
      <PurpleFlyingBunnyModal 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Telling Time</h2>
          </div>
          <div className="text-sm text-gray-600">
            Clock {currentTimeIndex + 1} of {shuffledClockTimes.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="bg-blue-50 rounded-lg p-8 mb-6">
            {drawClock(currentTime.hour, currentTime.minute)}
            <p className="text-lg text-gray-600 mt-4">What time is shown on this clock?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {allOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? option === currentTime.display
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : selectedAnswer === option
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{option}</span>
                  {showResult && option === currentTime.display && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === option && option !== currentTime.display && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentTimeIndex + 1) / shuffledClockTimes.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          Progress: {currentTimeIndex + 1} of {shuffledClockTimes.length} clocks
        </p>

        {/* Time learning tips */}
        <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">⏰ Time Tips</h3>
          <ul className="text-purple-700 space-y-1 text-sm">
            <li>• The short hand points to the hour</li>
            <li>• The long hand points to the minutes</li>
            <li>• When the minute hand points to 12, it's o'clock</li>
            <li>• When the minute hand points to 6, it's 30 minutes (half past)</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnalogClock;