import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface ReadingComprehensionProps {
  onBack: () => void;
  onSaveProgress: (score: number, total: number) => void;
}

interface Passage {
  id: string;
  title: string;
  content: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'science' | 'history' | 'literature' | 'nature';
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const passages: Passage[] = [
  {
    id: '1',
    title: 'The Amazing Octopus',
    content: `The octopus is one of the most intelligent creatures in the ocean. With eight arms covered in suckers, it can solve complex puzzles and even open jars to get food. Octopuses have excellent eyesight and can change their skin color to blend in with their surroundings, a skill called camouflage.

Scientists have discovered that octopuses can learn by watching other octopuses, which is very rare in the animal kingdom. They can also remember solutions to problems for months. Some octopuses have been observed using tools, like carrying coconut shells to use as shelters.

Despite their intelligence, most octopuses only live for one to two years. They spend their short lives exploring the ocean floor, hunting for crabs and fish, and avoiding predators like sharks and seals.`,
    difficulty: 'easy',
    category: 'science',
    questions: [
      {
        id: '1-1',
        question: 'What special ability do octopuses have that helps them hide from predators?',
        options: [
          'They can swim very fast',
          'They can change their skin color',
          'They can make loud noises',
          'They can grow bigger'
        ],
        correctAnswer: 1,
        explanation: 'Octopuses can change their skin color to blend in with their surroundings, which is called camouflage.'
      },
      {
        id: '1-2',
        question: 'How do scientists know that octopuses are intelligent?',
        options: [
          'They have big brains',
          'They can solve puzzles and remember solutions',
          'They can talk to each other',
          'They live in groups'
        ],
        correctAnswer: 1,
        explanation: 'Scientists have observed octopuses solving complex puzzles and remembering solutions for months.'
      },
      {
        id: '1-3',
        question: 'What do octopuses use coconut shells for?',
        options: [
          'Food',
          'Shelters',
          'Weapons',
          'Decoration'
        ],
        correctAnswer: 1,
        explanation: 'Some octopuses have been observed using coconut shells as shelters.'
      }
    ]
  },
  {
    id: '2',
    title: 'The Great Wall of China',
    content: `The Great Wall of China is one of the most impressive structures ever built by humans. Construction began over 2,000 years ago during the Qin Dynasty, and continued for many centuries. The wall stretches over 13,000 miles across northern China, making it the longest man-made structure in the world.

The wall was built to protect China from invaders from the north. It includes watchtowers where soldiers could keep lookout, and signal towers for communication. The wall is so wide that soldiers could march along the top of it, and it's tall enough to be difficult to climb over.

Today, the Great Wall is a UNESCO World Heritage Site and one of China's most popular tourist attractions. Millions of people visit each year to walk along its ancient stones and learn about its fascinating history.`,
    difficulty: 'medium',
    category: 'history',
    questions: [
      {
        id: '2-1',
        question: 'How long is the Great Wall of China?',
        options: [
          'Over 1,000 miles',
          'Over 5,000 miles',
          'Over 13,000 miles',
          'Over 20,000 miles'
        ],
        correctAnswer: 2,
        explanation: 'The Great Wall stretches over 13,000 miles across northern China.'
      },
      {
        id: '2-2',
        question: 'What was the main purpose of building the Great Wall?',
        options: [
          'To impress visitors',
          'To protect China from invaders',
          'To create jobs',
          'To mark the border'
        ],
        correctAnswer: 1,
        explanation: 'The wall was built to protect China from invaders from the north.'
      },
      {
        id: '2-3',
        question: 'What can be found along the Great Wall?',
        options: [
          'Only walls',
          'Watchtowers and signal towers',
          'Only gates',
          'Only stairs'
        ],
        correctAnswer: 1,
        explanation: 'The wall includes watchtowers where soldiers could keep lookout, and signal towers for communication.'
      }
    ]
  },
  {
    id: '3',
    title: 'The Water Cycle',
    content: `The water cycle is the continuous movement of water on, above, and below the Earth's surface. It's powered by the sun's energy and is essential for all life on Earth. The cycle has four main stages: evaporation, condensation, precipitation, and collection.

Evaporation happens when the sun heats up water from oceans, lakes, and rivers, turning it into water vapor that rises into the atmosphere. As the water vapor cools high in the sky, it condenses into tiny water droplets, forming clouds. When these droplets become too heavy, they fall back to Earth as precipitation - rain, snow, sleet, or hail.

The water then collects in oceans, lakes, rivers, and underground aquifers, where it can evaporate again and continue the cycle. This process has been happening for billions of years and ensures that Earth always has fresh water available for plants, animals, and humans.`,
    difficulty: 'medium',
    category: 'science',
    questions: [
      {
        id: '3-1',
        question: 'What powers the water cycle?',
        options: [
          'The moon',
          'The sun\'s energy',
          'Wind',
          'Gravity'
        ],
        correctAnswer: 1,
        explanation: 'The water cycle is powered by the sun\'s energy.'
      },
      {
        id: '3-2',
        question: 'What happens during evaporation?',
        options: [
          'Water falls from the sky',
          'Water turns into vapor and rises',
          'Water freezes',
          'Water collects in lakes'
        ],
        correctAnswer: 1,
        explanation: 'During evaporation, the sun heats up water, turning it into water vapor that rises into the atmosphere.'
      },
      {
        id: '3-3',
        question: 'What forms when water vapor cools in the atmosphere?',
        options: [
          'Rain',
          'Clouds',
          'Snow',
          'Ice'
        ],
        correctAnswer: 1,
        explanation: 'When water vapor cools high in the sky, it condenses into tiny water droplets, forming clouds.'
      }
    ]
  }
];

const ReadingComprehension: React.FC<ReadingComprehensionProps> = ({ onBack, onSaveProgress }) => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedPassages, setCompletedPassages] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const { playCorrect, playIncorrect, playClick } = useSoundEffects();

  const currentPassage = passages[currentPassageIndex];
  const currentQuestion = currentPassage?.questions[currentQuestionIndex];

  useEffect(() => {
    // Calculate total questions
    const total = passages.reduce((sum, passage) => sum + passage.questions.length, 0);
    setTotalQuestions(total);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    playClick(); // Play click sound
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    playClick(); // Play click sound
    
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      playCorrect(); // Play correct sound
      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } else {
      playIncorrect(); // Play incorrect sound
    }

    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < currentPassage.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed this passage
      setCompletedPassages(new Set([...completedPassages, currentPassage.id]));
      
      if (currentPassageIndex < passages.length - 1) {
        setCurrentPassageIndex(currentPassageIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        // All passages completed
        setShowResults(true);
        onSaveProgress(score, totalQuestions);
      }
    }
  };

  const handleRestart = () => {
    playClick(); // Play click sound
    setCurrentPassageIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompletedPassages(new Set());
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'science': return '🔬';
      case 'history': return '🏛️';
      case 'literature': return '📚';
      case 'nature': return '🌿';
      default: return '📖';
    }
  };

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Reading
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">
                {isPerfect ? '🎉' : percentage >= 80 ? '🎊' : '📚'}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Reading Comprehension Complete!
              </h1>
              
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {percentage}%
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                You got {score} out of {totalQuestions} questions correct!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-blue-600">Correct Answers</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{totalQuestions - score}</div>
                  <div className="text-sm text-green-600">Questions to Review</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{passages.length}</div>
                  <div className="text-sm text-purple-600">Passages Read</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reading
          </button>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {currentPassageIndex + 1} of {passages.length} passages
              </span>
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {currentPassage.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentPassageIndex * currentPassage.questions.length + currentQuestionIndex + 1) / totalQuestions) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Passage Header */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{currentPassage.title}</h1>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentPassage.difficulty)}`}>
                  {currentPassage.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  {getCategoryIcon(currentPassage.category)} {currentPassage.category}
                </span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentPassage.content}
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Question {currentQuestionIndex + 1}: {currentQuestion.question}
            </h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-700">{option}</span>
                    {showExplanation && selectedAnswer === index && (
                      <span className="ml-auto">
                        {index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm text-gray-600">
                Score: {score} / {totalQuestions}
              </div>
              <button
                onClick={showExplanation ? handleNextQuestion : handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {showExplanation ? 'Next Question' : 'Submit Answer'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        score={score}
        total={totalQuestions}
        message="EXCELLENT READING!"
      />
    </div>
  );
};

export default ReadingComprehension; 