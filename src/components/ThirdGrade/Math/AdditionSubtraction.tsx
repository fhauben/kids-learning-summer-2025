import React, { useState } from 'react';
import { Calculator, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { additionProblems, subtractionProblems, multiplicationProblems } from '../../../data/mathProblems';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface AdditionSubtractionProps {
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

// Utility to render vertical addition/subtraction
function renderVerticalMath(question: string, type: string) {
  const match = question.match(/(\d+)\s*([+-])\s*(\d+)/);
  if (!match) return <span className="text-4xl font-bold">{question}</span>;
  const [, num1, op, num2] = match;
  const maxLen = Math.max(num1.length, num2.length);
  const pad = (n: string) => n.padStart(maxLen, ' ');
  const lines = [
    '  ' + pad(num1),
    op + ' ' + pad(num2),
    '-'.repeat(maxLen + 2)
  ];
  return (
    <pre className="text-4xl font-mono text-center leading-tight mb-2">
      {lines.join('\n')}
    </pre>
  );
}

const AdditionSubtraction: React.FC<AdditionSubtractionProps> = ({ onBack, onSaveProgress }) => {
  const [allProblems] = useState(() => shuffleArray([
    ...additionProblems,
    ...subtractionProblems,
    ...multiplicationProblems
  ]));
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const { playCorrect, playIncorrect, playClick } = useSoundEffects();

  const currentProblem = allProblems[currentProblemIndex];

  const handleAnswer = (answer: number) => {
    playClick(); // Play click sound
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentProblem.answer) {
      playCorrect(); // Play correct sound
      setScore(score + 1);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } else {
      playIncorrect(); // Play incorrect sound
    }
    
    setTimeout(() => {
      setAnsweredQuestions(answeredQuestions + 1);
      if (currentProblemIndex < allProblems.length - 1) {
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
    setShowCelebration(false);
  };

  if (answeredQuestions === allProblems.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, allProblems.length);
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
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Math Champion!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {allProblems.length}!
          </p>
          <div className="mb-6">
            <div className="text-lg font-semibold text-blue-600">
              Accuracy: {Math.round((score / allProblems.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              You solved {additionProblems.length} addition, {subtractionProblems.length} subtraction, and {multiplicationProblems.length} multiplication problems!
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

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={score}
        total={allProblems.length}
        message="Math Genius!"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Addition, Subtraction & Multiplication</h2>
          </div>
          <div className="text-sm text-gray-600">
            Problem {currentProblemIndex + 1} of {allProblems.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className={`rounded-lg p-8 mb-6 ${
            currentProblem.type === 'addition' ? 'bg-green-50' : currentProblem.type === 'subtraction' ? 'bg-red-50' : 'bg-blue-50'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                currentProblem.type === 'addition'
                  ? 'bg-green-200 text-green-800'
                  : currentProblem.type === 'subtraction'
                  ? 'bg-red-200 text-red-800'
                  : 'bg-blue-200 text-blue-800'
              }`}>
                {currentProblem.type === 'addition'
                  ? 'Addition'
                  : currentProblem.type === 'subtraction'
                  ? 'Subtraction'
                  : 'Multiplication'}
              </span>
            </div>
            <h3 className={`text-4xl font-bold mb-4 ${
              currentProblem.type === 'addition'
                ? 'text-green-800'
                : currentProblem.type === 'subtraction'
                ? 'text-red-800'
                : 'text-blue-800'
            }`}>
              {(currentProblem.type === 'addition' || currentProblem.type === 'subtraction')
                ? renderVerticalMath(currentProblem.question, currentProblem.type)
                : currentProblem.question}
            </h3>

            <p className="text-gray-600">Choose the correct answer:</p>
          </div>

          {currentProblem.options && currentProblem.options.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
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
          ) : (
            <div className="text-center text-red-600 p-4">
              No options available for this problem
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentProblemIndex + 1) / allProblems.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          Progress: {currentProblemIndex + 1} of {allProblems.length} problems
        </p>

        {/* Math tips */}
        <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🧮 Math Tips</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• For addition: Start with the bigger number and count up</li>
            <li>• For subtraction: Think "what do I add to get the bigger number?"</li>
            <li>• Use your fingers or draw pictures to help visualize</li>
            <li>• Check your work by doing the opposite operation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdditionSubtraction;