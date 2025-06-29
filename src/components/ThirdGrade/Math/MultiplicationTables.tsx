import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, Star, Sparkles } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';

interface MultiplicationTablesProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Problem {
  num1: number;
  num2: number;
  answer: number;
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

// Generate all multiplication problems from 1x1 to 12x12
const generateAllMultiplicationProblems = (): Problem[] => {
  const problems: Problem[] = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      problems.push({
        num1: i,
        num2: j,
        answer: i * j
      });
    }
  }
  return problems;
};

const MultiplicationTables: React.FC<MultiplicationTablesProps> = ({ onBack, onSaveProgress }) => {
  const [allProblems] = useState(() => shuffleArray(generateAllMultiplicationProblems()));
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<Problem>(allProblems[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hasCompletedSession, setHasCompletedSession] = useState(false);

  const generateNewProblem = () => {
    const nextIndex = (currentProblemIndex + 1) % allProblems.length;
    setCurrentProblemIndex(nextIndex);
    setCurrentProblem(allProblems[nextIndex]);
  };

  useEffect(() => {
    setCurrentProblem(allProblems[0]);
  }, [allProblems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() === '') return;

    const userNum = parseInt(userAnswer);
    const correct = userNum === currentProblem.answer;
    
    setIsCorrect(correct);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);

    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      setBestStreak(Math.max(bestStreak, streak + 1));
      setShowCelebration(true);
      
      // Hide celebration after 2 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    } else {
      setStreak(0);
    }

    // Save progress after every 10 questions
    if ((totalQuestions + 1) % 10 === 0 && onSaveProgress && !hasCompletedSession) {
      onSaveProgress(score + (correct ? 1 : 0), totalQuestions + 1);
      setHasCompletedSession(true);
    }

    // Move to next problem after 2.5 seconds
    setTimeout(() => {
      setShowResult(false);
      setUserAnswer('');
      generateNewProblem();
    }, 2500);
  };

  const resetQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setShowResult(false);
    setUserAnswer('');
    setCurrentProblemIndex(0);
    setCurrentProblem(allProblems[0]);
    setHasCompletedSession(false);
    setShowCelebration(false);
  };

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Math
      </button>

      <CelebrationModal 
        show={showCelebration} 
        onClose={() => setShowCelebration(false)}
        type="unicorn"
        message="Magical Math!"
        subMessage="Multiplication Master!"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Multiplication Tables</h2>
          </div>
          <div className="text-right">
            <button
              onClick={resetQuiz}
              className="text-gray-500 hover:text-gray-700 font-semibold text-sm"
            >
              Reset
            </button>
            <div className="text-xs text-gray-500 mt-1">
              144 total problems available
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
              {streak} <Star className="w-4 h-4 ml-1" />
            </div>
            <div className="text-sm text-gray-600">Streak</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
              {bestStreak} <Sparkles className="w-4 h-4 ml-1" />
            </div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
        </div>

        {/* Problem */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 mb-6">
            <div className="text-6xl font-bold text-gray-800 mb-4">
              {currentProblem.num1} × {currentProblem.num2} = ?
            </div>
            
            <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-3xl font-bold text-center w-32 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="?"
                disabled={showResult}
                autoFocus
              />
              <button
                type="submit"
                disabled={showResult || userAnswer.trim() === ''}
                className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check
              </button>
            </form>
          </div>

          {/* Result */}
          {showResult && (
            <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2`}>
              <div className="flex items-center justify-center mb-2">
                {isCorrect ? (
                  <>
                    <div className="text-4xl mr-2">🎉</div>
                    <div className="text-2xl font-bold text-green-800">Correct!</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mr-2">💪</div>
                    <div className="text-2xl font-bold text-red-800">Try Again!</div>
                  </>
                )}
              </div>
              <div className="text-lg text-gray-700">
                {currentProblem.num1} × {currentProblem.num2} = {currentProblem.answer}
              </div>
              {isCorrect && streak > 1 && (
                <div className="text-purple-600 font-semibold mt-2">
                  🔥 {streak} in a row! Keep going!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Questions Answered: {totalQuestions}</span>
            <span>Problems Available: 144</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalQuestions / 144) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 Multiplication Tips</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Remember: 5 × anything ends in 0 or 5</li>
            <li>• For 9s: The digits always add up to 9 (9×2=18, 1+8=9)</li>
            <li>• Doubles are easier: 6×6, 7×7, 8×8</li>
            <li>• Practice the harder ones: 6×7, 6×8, 7×8, 8×9</li>
            <li>• All 144 problems (1×1 through 12×12) appear randomly!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationTables;