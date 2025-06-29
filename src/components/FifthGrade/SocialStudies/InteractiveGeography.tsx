import React, { useState, useEffect } from 'react';
import { ArrowLeft, Map, Globe, Mountain, Leaf, Building, RotateCcw, Award } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface InteractiveGeographyProps {
  onBack: () => void;
  onSaveProgress: (score: number, total: number) => void;
}

interface GeographyQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'regions' | 'landmarks' | 'climate' | 'landforms' | 'cities';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Region {
  name: string;
  states: string[];
  climate: string;
  landmarks: string[];
  description: string;
}

const regions: Region[] = [
  {
    name: 'Northeast',
    states: ['Maine', 'New Hampshire', 'Vermont', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New York', 'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland'],
    climate: 'Humid continental with cold winters and warm summers',
    landmarks: ['Statue of Liberty', 'Niagara Falls', 'Acadia National Park', 'Freedom Trail'],
    description: 'Known for its rich history, major cities, and beautiful fall foliage.'
  },
  {
    name: 'Southeast',
    states: ['Virginia', 'West Virginia', 'Kentucky', 'Tennessee', 'North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Alabama', 'Mississippi', 'Arkansas', 'Louisiana'],
    climate: 'Humid subtropical with hot summers and mild winters',
    landmarks: ['Everglades National Park', 'Great Smoky Mountains', 'Disney World', 'French Quarter'],
    description: 'Features beautiful beaches, historic plantations, and diverse wildlife.'
  },
  {
    name: 'Midwest',
    states: ['Ohio', 'Indiana', 'Illinois', 'Michigan', 'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas'],
    climate: 'Humid continental with four distinct seasons',
    landmarks: ['Mount Rushmore', 'Great Lakes', 'Gateway Arch', 'Badlands National Park'],
    description: 'Known as America\'s breadbasket with vast farmlands and the Great Lakes.'
  },
  {
    name: 'Southwest',
    states: ['Oklahoma', 'Texas', 'New Mexico', 'Arizona'],
    climate: 'Arid and semi-arid with hot summers and mild winters',
    landmarks: ['Grand Canyon', 'Alamo', 'Carlsbad Caverns', 'Big Bend National Park'],
    description: 'Features deserts, canyons, and a rich Native American and Hispanic heritage.'
  },
  {
    name: 'West',
    states: ['Colorado', 'Wyoming', 'Montana', 'Idaho', 'Washington', 'Oregon', 'California', 'Nevada', 'Utah'],
    climate: 'Varied - from Mediterranean to alpine to desert',
    landmarks: ['Yellowstone National Park', 'Golden Gate Bridge', 'Yosemite National Park', 'Mount Rainier'],
    description: 'Home to stunning mountains, national parks, and the Pacific coastline.'
  }
];

const geographyQuestions: GeographyQuestion[] = [
  // Region Questions
  {
    id: '1',
    question: 'Which region is known as America\'s breadbasket due to its vast farmlands?',
    options: ['Northeast', 'Southeast', 'Midwest', 'Southwest'],
    correctAnswer: 2,
    explanation: 'The Midwest is known as America\'s breadbasket because it has vast farmlands that produce much of the country\'s food.',
    category: 'regions',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'Which region features the Grand Canyon and other desert landscapes?',
    options: ['West', 'Southwest', 'Midwest', 'Southeast'],
    correctAnswer: 1,
    explanation: 'The Southwest region features the Grand Canyon and other desert landscapes like the Sonoran Desert.',
    category: 'regions',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'Which region has a humid subtropical climate with hot summers and mild winters?',
    options: ['Northeast', 'Southeast', 'Midwest', 'West'],
    correctAnswer: 1,
    explanation: 'The Southeast has a humid subtropical climate characterized by hot, humid summers and mild winters.',
    category: 'climate',
    difficulty: 'medium'
  },
  // Landmark Questions
  {
    id: '4',
    question: 'Which famous landmark is located in New York City?',
    options: ['Golden Gate Bridge', 'Statue of Liberty', 'Mount Rushmore', 'Grand Canyon'],
    correctAnswer: 1,
    explanation: 'The Statue of Liberty is located on Liberty Island in New York Harbor, New York City.',
    category: 'landmarks',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: 'Which national park is famous for its geysers and hot springs?',
    options: ['Yosemite', 'Yellowstone', 'Grand Canyon', 'Everglades'],
    correctAnswer: 1,
    explanation: 'Yellowstone National Park is famous for its geysers, including Old Faithful, and hot springs.',
    category: 'landmarks',
    difficulty: 'medium'
  },
  {
    id: '6',
    question: 'Which landmark was carved into the Black Hills of South Dakota?',
    options: ['Mount Rushmore', 'Crazy Horse Memorial', 'Devils Tower', 'Badlands'],
    correctAnswer: 0,
    explanation: 'Mount Rushmore was carved into the Black Hills of South Dakota, featuring the faces of four U.S. presidents.',
    category: 'landmarks',
    difficulty: 'easy'
  },
  // Landform Questions
  {
    id: '7',
    question: 'What type of landform is the Grand Canyon?',
    options: ['Mountain', 'Canyon', 'Plateau', 'Valley'],
    correctAnswer: 1,
    explanation: 'The Grand Canyon is a canyon, which is a deep, narrow valley with steep sides.',
    category: 'landforms',
    difficulty: 'easy'
  },
  {
    id: '8',
    question: 'Which mountain range runs along the eastern United States?',
    options: ['Rocky Mountains', 'Appalachian Mountains', 'Sierra Nevada', 'Cascade Range'],
    correctAnswer: 1,
    explanation: 'The Appalachian Mountains run along the eastern United States from Maine to Georgia.',
    category: 'landforms',
    difficulty: 'medium'
  },
  {
    id: '9',
    question: 'What are the five large lakes in the northern Midwest called?',
    options: ['Great Lakes', 'Big Lakes', 'Northern Lakes', 'Midwest Lakes'],
    correctAnswer: 0,
    explanation: 'The five large lakes in the northern Midwest are called the Great Lakes: Superior, Michigan, Huron, Erie, and Ontario.',
    category: 'landforms',
    difficulty: 'easy'
  },
  // Climate Questions
  {
    id: '10',
    question: 'Which region experiences four distinct seasons with cold winters?',
    options: ['Southeast', 'Southwest', 'Northeast', 'West Coast'],
    correctAnswer: 2,
    explanation: 'The Northeast experiences four distinct seasons with cold winters, warm summers, and beautiful fall foliage.',
    category: 'climate',
    difficulty: 'medium'
  },
  {
    id: '11',
    question: 'Which region has a Mediterranean climate with mild, wet winters and hot, dry summers?',
    options: ['California Coast', 'Florida', 'Texas', 'Washington'],
    correctAnswer: 0,
    explanation: 'The California Coast has a Mediterranean climate with mild, wet winters and hot, dry summers.',
    category: 'climate',
    difficulty: 'hard'
  },
  {
    id: '12',
    question: 'Which region is known for its tornadoes and severe weather?',
    options: ['Tornado Alley (Midwest)', 'Hurricane Alley (Southeast)', 'Earthquake Zone (West)', 'Blizzard Belt (Northeast)'],
    correctAnswer: 0,
    explanation: 'Tornado Alley, located in the Midwest, is known for its frequent tornadoes and severe weather.',
    category: 'climate',
    difficulty: 'medium'
  }
];

const InteractiveGeography: React.FC<InteractiveGeographyProps> = ({ onBack, onSaveProgress }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [filteredQuestions, setFilteredQuestions] = useState<GeographyQuestion[]>([]);

  const { playCorrect, playIncorrect, playClick } = useSoundEffects();

  useEffect(() => {
    filterQuestions();
  }, [selectedCategory, difficulty]);

  const filterQuestions = () => {
    let filtered = geographyQuestions;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    filtered = filtered.filter(q => q.difficulty === difficulty);
    
    // Shuffle the questions
    filtered = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    
    setFilteredQuestions(filtered);
    setTotalQuestions(filtered.length);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    playClick();
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    playClick();
    setShowExplanation(true);
    
    if (selectedAnswer === filteredQuestions[currentQuestionIndex].correctAnswer) {
      playCorrect();
      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } else {
      playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    playClick();
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      onSaveProgress(score, filteredQuestions.length);
    }
  };

  const handleRestart = () => {
    playClick();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setShowResults(false);
    setShowCelebration(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'regions': return <Globe className="w-5 h-5" />;
      case 'landmarks': return <Building className="w-5 h-5" />;
      case 'landforms': return <Mountain className="w-5 h-5" />;
      case 'climate': return <Leaf className="w-5 h-5" />;
      case 'cities': return <Building className="w-5 h-5" />;
      default: return <Map className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
              Back to Social Studies
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">
                {isPerfect ? '🌍' : percentage >= 80 ? '🗺️' : '📚'}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Geography Quiz Complete!
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

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Social Studies
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Interactive Geography</h1>
              
              {/* Settings */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Category:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['all', 'regions', 'landmarks', 'landforms', 'climate', 'cities'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-3 rounded-lg border-2 transition-colors flex items-center ${
                          selectedCategory === cat
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {getCategoryIcon(cat)}
                        <span className="ml-2 font-medium capitalize">{cat}</span>
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
                  onClick={filterQuestions}
                  className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
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
            Back to Social Studies
          </button>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Score: {score} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(currentQuestion.category)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
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
              <button
                onClick={handleRestart}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                <RotateCcw className="w-4 h-4 inline mr-1" />
                New Quiz
              </button>
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
        total={filteredQuestions.length}
        message="GEOGRAPHY EXPERT!"
      />
    </div>
  );
};

export default InteractiveGeography; 