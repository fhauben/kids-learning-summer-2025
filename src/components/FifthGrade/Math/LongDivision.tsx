import React, { useState } from 'react';
import { Calculator, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { longDivisionProblems } from '../../../data/mathProblems';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface LongDivisionProps {
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

const RainbowNarwhalAnimation: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-bounce">
        <div className="text-8xl mb-4 animate-pulse">🦄</div>
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
          <div className="w-5 h-5 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-5 h-5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-5 h-5 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-5 h-5 bg-indigo-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-5 h-5 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
          Narwhal-icious! 🌊
        </div>
      </div>
      
      {/* Ocean waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-400 to-blue-300 opacity-70 animate-pulse"></div>
        <div className="absolute bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-blue-500 to-blue-400 opacity-60 animate-ping"></div>
      </div>
      
      {/* Rainbow sparkles */}
      <div className="absolute top-1/4 left-1/4 text-red-400 text-3xl animate-ping">⭐</div>
      <div className="absolute top-1/3 right-1/4 text-orange-400 text-2xl animate-ping" style={{ animationDelay: '0.2s' }}>✨</div>
      <div className="absolute bottom-1/3 left-1/3 text-yellow-400 text-3xl animate-ping" style={{ animationDelay: '0.4s' }}>⭐</div>
      <div className="absolute bottom-1/4 right-1/3 text-green-400 text-2xl animate-ping" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute top-1/2 left-1/6 text-blue-400 text-3xl animate-ping" style={{ animationDelay: '0.8s' }}>⭐</div>
      <div className="absolute top-1/2 right-1/6 text-purple-400 text-2xl animate-ping" style={{ animationDelay: '1s' }}>✨</div>
      
      {/* Swimming motion lines */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse opacity-50"></div>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-40 mt-2" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse opacity-30 mt-2" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
};

const LongDivision: React.FC<LongDivisionProps> = ({ onBack, onSaveProgress }) => {
  const [shuffledProblems] = useState(() => shuffleArray(longDivisionProblems));
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const { playCorrect, playIncorrect, playClick } = useSoundEffects();

  const currentProblem = shuffledProblems[currentProblemIndex];

  const handleAnswer = (answer: number) => {
    playClick(); // Play click sound
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentProblem.answer) {
      playCorrect(); // Play correct sound
      setScore(score + 1);
      setShowAnimation(true);
      
      // Hide animation after 2.5 seconds
      setTimeout(() => {
        setShowAnimation(false);
      }, 2500);
    } else {
      playIncorrect(); // Play incorrect sound
    }
    
    setTimeout(() => {
      setAnsweredQuestions(answeredQuestions + 1);
      if (currentProblemIndex < shuffledProblems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    playClick(); // Play click sound
    setCurrentProblemIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowAnimation(false);
  };

  if (answeredQuestions === shuffledProblems.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, shuffledProblems.length);
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
          <div className="text-6xl mb-4">🧮</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Division Master!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {shuffledProblems.length}!
          </p>
          <div className="mb-6">
            <div className="text-lg font-semibold text-blue-600">
              Accuracy: {Math.round((score / shuffledProblems.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              You solved {shuffledProblems.length} long division problems!
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

      <RainbowNarwhalAnimation show={showAnimation} />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Long Division</h2>
          </div>
          <div className="text-sm text-gray-600">
            Problem {currentProblemIndex + 1} of {shuffledProblems.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="bg-blue-50 rounded-lg p-8 mb-6">
            <h3 className="text-4xl font-bold text-blue-800 mb-4">
              {currentProblem.question}
            </h3>
            <p className="text-gray-600">Choose the correct answer:</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentProblem.options!.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`p-6 rounded-lg border-2 transition-all ${
                  showResult
                    ? option === currentProblem.answer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : selectedAnswer === option
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{option}</span>
                  {showResult && option === currentProblem.answer && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  {showResult && selectedAnswer === option && option !== currentProblem.answer && (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Encouraging message after correct answer */}
          {showResult && selectedAnswer === currentProblem.answer && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-300">
              <div className="text-2xl font-bold text-blue-800 mb-2">
                🌊 Excellent Division Skills! 🌊
              </div>
              <p className="text-blue-700">
                You're swimming through these problems like a majestic narwhal!
              </p>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentProblemIndex + 1) / shuffledProblems.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          Progress: {currentProblemIndex + 1} of {shuffledProblems.length} problems
        </p>

        {/* Division tips */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border-l-4 border-cyan-400">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">🧮 Division Tips</h3>
          <ul className="text-cyan-700 space-y-1 text-sm">
            <li>• Think: "How many times does the divisor fit into the dividend?"</li>
            <li>• Use multiplication tables to help check your work</li>
            <li>• Break big numbers into smaller, easier parts</li>
            <li>• Remember: Division is the opposite of multiplication!</li>
            <li>• All {shuffledProblems.length} problems appear in random order!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LongDivision;