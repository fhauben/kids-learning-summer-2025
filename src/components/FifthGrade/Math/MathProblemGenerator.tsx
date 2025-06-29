import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, RotateCcw, Target, TrendingUp, Award, CheckCircle, XCircle } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';

interface MathProblemGeneratorProps {
  onBack: () => void;
  onSaveProgress: (score: number, total: number) => void;
}

interface MathProblem {
  id: string;
  question: string;
  answer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'decimals' | 'mixed';
}

const MathProblemGenerator: React.FC<MathProblemGeneratorProps> = ({ onBack, onSaveProgress }) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['addition', 'subtraction', 'multiplication', 'division']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showResults, setShowResults] = useState(false);
  const [problems, setProblems] = useState<MathProblem[]>([]);

  const generateProblems = () => {
    const newProblems: MathProblem[] = [];
    const numProblems = 10;

    for (let i = 0; i < numProblems; i++) {
      const category = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
      newProblems.push(generateProblem(category, difficulty, i));
    }

    setProblems(newProblems);
    setCurrentProblem(newProblems[0]);
    setTotalProblems(numProblems);
    setCurrentProblemIndex(0);
    setScore(0);
    setShowResults(false);
  };

  const generateProblem = (category: string, difficulty: string, index: number): MathProblem => {
    let question = '';
    let answer = 0;
    let explanation = '';

    switch (category) {
      case 'addition':
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 100) + 1;
          const b = Math.floor(Math.random() * 100) + 1;
          question = `${a} + ${b} = ?`;
          answer = a + b;
          explanation = `${a} + ${b} = ${answer}`;
        } else if (difficulty === 'medium') {
          const a = Math.floor(Math.random() * 1000) + 100;
          const b = Math.floor(Math.random() * 1000) + 100;
          question = `${a} + ${b} = ?`;
          answer = a + b;
          explanation = `${a} + ${b} = ${answer}`;
        } else {
          const a = Math.floor(Math.random() * 10000) + 1000;
          const b = Math.floor(Math.random() * 10000) + 1000;
          const c = Math.floor(Math.random() * 1000) + 100;
          question = `${a} + ${b} + ${c} = ?`;
          answer = a + b + c;
          explanation = `${a} + ${b} + ${c} = ${answer}`;
        }
        break;

      case 'subtraction':
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 100) + 50;
          const b = Math.floor(Math.random() * a) + 1;
          question = `${a} - ${b} = ?`;
          answer = a - b;
          explanation = `${a} - ${b} = ${answer}`;
        } else if (difficulty === 'medium') {
          const a = Math.floor(Math.random() * 1000) + 500;
          const b = Math.floor(Math.random() * a) + 100;
          question = `${a} - ${b} = ?`;
          answer = a - b;
          explanation = `${a} - ${b} = ${answer}`;
        } else {
          const a = Math.floor(Math.random() * 10000) + 5000;
          const b = Math.floor(Math.random() * a) + 1000;
          question = `${a} - ${b} = ?`;
          answer = a - b;
          explanation = `${a} - ${b} = ${answer}`;
        }
        break;

      case 'multiplication':
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 12) + 1;
          const b = Math.floor(Math.random() * 12) + 1;
          question = `${a} × ${b} = ?`;
          answer = a * b;
          explanation = `${a} × ${b} = ${answer}`;
        } else if (difficulty === 'medium') {
          const a = Math.floor(Math.random() * 50) + 10;
          const b = Math.floor(Math.random() * 20) + 5;
          question = `${a} × ${b} = ?`;
          answer = a * b;
          explanation = `${a} × ${b} = ${answer}`;
        } else {
          const a = Math.floor(Math.random() * 100) + 50;
          const b = Math.floor(Math.random() * 50) + 25;
          question = `${a} × ${b} = ?`;
          answer = a * b;
          explanation = `${a} × ${b} = ${answer}`;
        }
        break;

      case 'division':
        if (difficulty === 'easy') {
          const b = Math.floor(Math.random() * 12) + 1;
          const answer = Math.floor(Math.random() * 12) + 1;
          const a = b * answer;
          question = `${a} ÷ ${b} = ?`;
          explanation = `${a} ÷ ${b} = ${answer}`;
        } else if (difficulty === 'medium') {
          const b = Math.floor(Math.random() * 20) + 5;
          const answer = Math.floor(Math.random() * 20) + 5;
          const a = b * answer;
          question = `${a} ÷ ${b} = ?`;
          explanation = `${a} ÷ ${b} = ${answer}`;
        } else {
          const b = Math.floor(Math.random() * 50) + 25;
          const answer = Math.floor(Math.random() * 20) + 10;
          const a = b * answer;
          question = `${a} ÷ ${b} = ?`;
          explanation = `${a} ÷ ${b} = ${answer}`;
        }
        break;

      case 'fractions':
        if (difficulty === 'easy') {
          const num1 = Math.floor(Math.random() * 5) + 1;
          const den1 = Math.floor(Math.random() * 5) + 1;
          const num2 = Math.floor(Math.random() * 5) + 1;
          const den2 = Math.floor(Math.random() * 5) + 1;
          question = `${num1}/${den1} + ${num2}/${den2} = ?`;
          answer = Math.round((num1/den1 + num2/den2) * 100) / 100;
          explanation = `${num1}/${den1} + ${num2}/${den2} = ${answer}`;
        } else if (difficulty === 'medium') {
          const num1 = Math.floor(Math.random() * 10) + 1;
          const den1 = Math.floor(Math.random() * 10) + 1;
          const num2 = Math.floor(Math.random() * 10) + 1;
          const den2 = Math.floor(Math.random() * 10) + 1;
          question = `${num1}/${den1} × ${num2}/${den2} = ?`;
          answer = Math.round((num1/den1 * num2/den2) * 100) / 100;
          explanation = `${num1}/${den1} × ${num2}/${den2} = ${answer}`;
        } else {
          const num1 = Math.floor(Math.random() * 15) + 1;
          const den1 = Math.floor(Math.random() * 15) + 1;
          const num2 = Math.floor(Math.random() * 15) + 1;
          const den2 = Math.floor(Math.random() * 15) + 1;
          question = `${num1}/${den1} ÷ ${num2}/${den2} = ?`;
          answer = Math.round((num1/den1 / num2/den2) * 100) / 100;
          explanation = `${num1}/${den1} ÷ ${num2}/${den2} = ${answer}`;
        }
        break;

      case 'decimals':
        if (difficulty === 'easy') {
          const a = Math.round((Math.random() * 10) * 10) / 10;
          const b = Math.round((Math.random() * 10) * 10) / 10;
          question = `${a} + ${b} = ?`;
          answer = Math.round((a + b) * 10) / 10;
          explanation = `${a} + ${b} = ${answer}`;
        } else if (difficulty === 'medium') {
          const a = Math.round((Math.random() * 100) * 100) / 100;
          const b = Math.round((Math.random() * 10) * 10) / 10;
          question = `${a} × ${b} = ?`;
          answer = Math.round((a * b) * 100) / 100;
          explanation = `${a} × ${b} = ${answer}`;
        } else {
          const a = Math.round((Math.random() * 100) * 100) / 100;
          const b = Math.round((Math.random() * 10) * 10) / 10;
          question = `${a} ÷ ${b} = ?`;
          answer = Math.round((a / b) * 100) / 100;
          explanation = `${a} ÷ ${b} = ${answer}`;
        }
        break;

      default:
        // Mixed operations
        const operations = ['+', '-', '×', '÷'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 20) + 5;
        
        switch (op) {
          case '+':
            question = `${a} + ${b} = ?`;
            answer = a + b;
            explanation = `${a} + ${b} = ${answer}`;
            break;
          case '-':
            question = `${a} - ${b} = ?`;
            answer = a - b;
            explanation = `${a} - ${b} = ${answer}`;
            break;
          case '×':
            question = `${a} × ${b} = ?`;
            answer = a * b;
            explanation = `${a} × ${b} = ${answer}`;
            break;
          case '÷':
            const c = a * b;
            question = `${c} ÷ ${b} = ?`;
            answer = a;
            explanation = `${c} ÷ ${b} = ${answer}`;
            break;
        }
    }

    return {
      id: `problem-${index}`,
      question,
      answer,
      explanation,
      difficulty,
      category: category as any
    };
  };

  const handleSubmit = () => {
    if (!currentProblem || !userAnswer) return;

    const userAnswerNum = parseFloat(userAnswer);
    const correct = Math.abs(userAnswerNum - currentProblem.answer) < 0.01; // Allow for small decimal differences

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
      setShowCelebration(true);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    setUserAnswer('');
    setShowExplanation(false);
    setIsCorrect(false);

    if (currentProblemIndex < problems.length - 1) {
      const nextIndex = currentProblemIndex + 1;
      setCurrentProblemIndex(nextIndex);
      setCurrentProblem(problems[nextIndex]);
    } else {
      setShowResults(true);
      onSaveProgress(score, totalProblems);
    }
  };

  const handleRestart = () => {
    generateProblems();
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'addition': return '+';
      case 'subtraction': return '-';
      case 'multiplication': return '×';
      case 'division': return '÷';
      case 'fractions': return '⅟';
      case 'decimals': return '.';
      default: return '?';
    }
  };

  useEffect(() => {
    generateProblems();
  }, []);

  if (showResults) {
    const percentage = Math.round((score / totalProblems) * 100);
    const isPerfect = score === totalProblems;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Math
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">
                {isPerfect ? '🎉' : percentage >= 80 ? '🎊' : '🧮'}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Math Practice Complete!
              </h1>
              
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {percentage}%
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                You got {score} out of {totalProblems} problems correct!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-blue-600">Correct Answers</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{totalProblems - score}</div>
                  <div className="text-sm text-green-600">Problems to Review</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{difficulty}</div>
                  <div className="text-sm text-purple-600">Difficulty Level</div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={onBack}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Math
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Math Problem Generator</h1>
              
              {/* Settings */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Operations:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['addition', 'subtraction', 'multiplication', 'division', 'fractions', 'decimals', 'mixed'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (selectedCategories.includes(cat)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== cat));
                          } else {
                            setSelectedCategories([...selectedCategories, cat]);
                          }
                        }}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          selectedCategories.includes(cat)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{getCategoryIcon(cat)}</div>
                        <div className="text-sm font-medium capitalize">{cat}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Difficulty Level:</h3>
                  <div className="flex space-x-3">
                    {(['easy', 'medium', 'hard'] as const).map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          difficulty === diff
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateProblems}
                  disabled={selectedCategories.length === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    selectedCategories.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Math
          </button>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Problem {currentProblemIndex + 1} of {totalProblems}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Score: {score} / {totalProblems}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentProblemIndex + 1) / totalProblems) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Problem Card */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{currentProblem.question}</h1>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentProblem.difficulty)}`}>
                  {currentProblem.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  {getCategoryIcon(currentProblem.category)} {currentProblem.category}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <input
                  type="number"
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showExplanation}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-2xl font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your answer..."
                />
              </div>

              {showExplanation && (
                <div className={`border rounded-lg p-4 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {currentProblem.explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  <RotateCcw className="w-4 h-4 inline mr-1" />
                  New Problems
                </button>
                <button
                  onClick={showExplanation ? handleNext : handleSubmit}
                  disabled={!userAnswer}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    !userAnswer
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {showExplanation ? 'Next Problem' : 'Submit Answer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CelebrationModal
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        type="star"
        message="CORRECT!"
        subMessage="Great math skills!"
      />
    </div>
  );
};

export default MathProblemGenerator; 