import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Info, Play, CheckCircle, XCircle, Trophy, Shuffle } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';

interface AnglesActivityProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
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

const quizQuestionsBase: QuizQuestion[] = [
  {
    id: '1',
    question: 'What type of angle is exactly 90 degrees?',
    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
    correct: 1,
    explanation: 'A right angle is exactly 90 degrees and forms a perfect corner.'
  },
  {
    id: '2',
    question: 'What type of angle is less than 90 degrees?',
    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
    correct: 0,
    explanation: 'An acute angle is less than 90 degrees and looks sharp and pointed.'
  },
  {
    id: '3',
    question: 'What type of angle is greater than 90 degrees?',
    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
    correct: 2,
    explanation: 'An obtuse angle is greater than 90 degrees and looks wide and open.'
  },
  {
    id: '4',
    question: 'How many degrees do all angles in a triangle add up to?',
    options: ['90°', '180°', '270°', '360°'],
    correct: 1,
    explanation: 'All triangles have angles that add up to exactly 180 degrees!'
  },
  {
    id: '5',
    question: 'What type of triangle has all three sides the same length?',
    options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
    correct: 2,
    explanation: 'An equilateral triangle has all three sides equal and all angles are 60°.'
  },
  {
    id: '6',
    question: 'What type of triangle has two sides the same length?',
    options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
    correct: 1,
    explanation: 'An isosceles triangle has two equal sides and two equal angles.'
  },
  {
    id: '7',
    question: 'What type of triangle has all three sides different lengths?',
    options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
    correct: 0,
    explanation: 'A scalene triangle has all three sides different lengths and all different angles.'
  },
  {
    id: '8',
    question: 'If a triangle has angles of 60°, 60°, and 60°, what type is it?',
    options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
    correct: 2,
    explanation: 'An equilateral triangle has all angles equal to 60°. Notice: 60° + 60° + 60° = 180°!'
  },
  {
    id: '9',
    question: 'If two angles in a triangle are 45° and 90°, what is the third angle?',
    options: ['30°', '45°', '60°', '90°'],
    correct: 1,
    explanation: 'Since angles must add to 180°: 45° + 90° + ? = 180°, so ? = 45°.'
  },
  {
    id: '10',
    question: 'How many degrees is a straight line?',
    options: ['90°', '180°', '270°', '360°'],
    correct: 1,
    explanation: 'A straight line is 180 degrees - it\'s like two right angles put together!'
  }
];

const AnglesActivity: React.FC<AnglesActivityProps> = ({ onBack, onSaveProgress }) => {
  const [currentSection, setCurrentSection] = useState<'angles' | 'triangles' | 'quiz'>('angles');
  const [angle, setAngle] = useState(45);
  const [showInfo, setShowInfo] = useState(true);
  
  // Triangle demonstration state
  const [triangleType, setTriangleType] = useState<'equilateral' | 'isosceles' | 'scalene' | 'right'>('equilateral');
  const [showTriangleAngles, setShowTriangleAngles] = useState(true);
  
  // Quiz state
  const [quizQuestions] = useState(() => shuffleArray(quizQuestionsBase));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const getAngleType = (degrees: number) => {
    if (degrees < 90) return 'acute';
    if (degrees === 90) return 'right';
    return 'obtuse';
  };

  const getAngleDescription = (type: string) => {
    switch (type) {
      case 'acute':
        return { name: 'Acute Angle', description: 'Less than 90°', color: 'text-green-600', bgColor: 'bg-green-50' };
      case 'right':
        return { name: 'Right Angle', description: 'Exactly 90°', color: 'text-blue-600', bgColor: 'bg-blue-50' };
      case 'obtuse':
        return { name: 'Obtuse Angle', description: 'Greater than 90°', color: 'text-red-600', bgColor: 'bg-red-50' };
      default:
        return { name: '', description: '', color: '', bgColor: '' };
    }
  };

  const getTriangleInfo = (type: string) => {
    switch (type) {
      case 'equilateral':
        return { 
          name: 'Equilateral Triangle', 
          description: 'All sides equal, all angles 60°',
          angles: [60, 60, 60],
          color: 'text-blue-600'
        };
      case 'isosceles':
        return { 
          name: 'Isosceles Triangle', 
          description: 'Two sides equal, two angles equal',
          angles: [70, 70, 40],
          color: 'text-green-600'
        };
      case 'scalene':
        return { 
          name: 'Scalene Triangle', 
          description: 'All sides different, all angles different',
          angles: [80, 60, 40],
          color: 'text-purple-600'
        };
      case 'right':
        return { 
          name: 'Right Triangle', 
          description: 'One angle is exactly 90°',
          angles: [90, 60, 30],
          color: 'text-red-600'
        };
      default:
        return { name: '', description: '', angles: [60, 60, 60], color: '' };
    }
  };

  const angleType = getAngleType(angle);
  const angleInfo = getAngleDescription(angleType);

  const drawAngle = (degrees: number) => {
    const radius = 80;
    const centerX = 150;
    const centerY = 150;
    
    const radians = (degrees * Math.PI) / 180;
    const endX = centerX + radius * Math.cos(-radians);
    const endY = centerY + radius * Math.sin(-radians);
    
    const largeArcFlag = degrees > 180 ? 1 : 0;
    const arcEndX = centerX + 30 * Math.cos(-radians);
    const arcEndY = centerY + 30 * Math.sin(-radians);
    
    return (
      <svg width="300" height="300" className="mx-auto">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="300" height="300" fill="url(#grid)" />
        
        <line
          x1={centerX - radius}
          y1={centerY}
          x2={centerX + radius}
          y2={centerY}
          stroke="#374151"
          strokeWidth="3"
        />
        
        <line
          x1={centerX}
          y1={centerY}
          x2={endX}
          y2={endY}
          stroke="#3B82F6"
          strokeWidth="3"
        />
        
        <path
          d={`M ${centerX + 30} ${centerY} A 30 30 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke={angleType === 'acute' ? '#10B981' : angleType === 'right' ? '#3B82F6' : '#EF4444'}
          strokeWidth="2"
        />
        
        <circle cx={centerX} cy={centerY} r="4" fill="#374151" />
        
        {degrees === 90 && (
          <rect
            x={centerX}
            y={centerY - 15}
            width="15"
            height="15"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
        )}
        
        <text
          x={centerX + 40 * Math.cos(-radians / 2)}
          y={centerY + 40 * Math.sin(-radians / 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold fill-gray-700"
        >
          {degrees}°
        </text>
      </svg>
    );
  };

  const drawTriangle = (type: string) => {
    const triangleInfo = getTriangleInfo(type);
    const [angle1, angle2, angle3] = triangleInfo.angles;
    
    let points = '';
    let side1 = '', side2 = '', side3 = '';
    
    switch (type) {
      case 'equilateral':
        points = '150,50 100,150 200,150';
        side1 = side2 = side3 = '86.6';
        break;
      case 'isosceles':
        points = '150,50 120,150 180,150';
        side1 = side2 = '100';
        side3 = '60';
        break;
      case 'scalene':
        points = '150,50 110,150 190,150';
        side1 = '94.9';
        side2 = '72.1';
        side3 = '80';
        break;
      case 'right':
        points = '150,50 150,150 200,150';
        side1 = '100';
        side2 = '50';
        side3 = '111.8';
        break;
    }
    
    return (
      <svg width="300" height="200" className="mx-auto">
        <polygon
          points={points}
          fill="rgba(59, 130, 246, 0.1)"
          stroke="#3B82F6"
          strokeWidth="3"
        />
        
        {showTriangleAngles && (
          <>
            <text x="150" y="45" textAnchor="middle" className="text-sm font-bold fill-blue-600">
              {angle1}°
            </text>
            <text x="105" y="165" textAnchor="middle" className="text-sm font-bold fill-blue-600">
              {angle2}°
            </text>
            <text x="195" y="165" textAnchor="middle" className="text-sm font-bold fill-blue-600">
              {angle3}°
            </text>
            
            {/* Show the sum */}
            <text x="150" y="185" textAnchor="middle" className="text-xs font-semibold fill-green-600">
              {angle1}° + {angle2}° + {angle3}° = {angle1 + angle2 + angle3}°
            </text>
          </>
        )}
        
        {/* Right angle indicator for right triangle */}
        {type === 'right' && (
          <rect
            x="140"
            y="140"
            width="10"
            height="10"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
          />
        )}
      </svg>
    );
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    
    setTimeout(() => {
      setAnsweredQuestions(answeredQuestions + 1);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowCelebration(false);
  };

  const presetAngles = [
    { name: 'Sharp Acute', value: 30 },
    { name: 'Wide Acute', value: 60 },
    { name: 'Right Angle', value: 90 },
    { name: 'Narrow Obtuse', value: 120 },
    { name: 'Wide Obtuse', value: 150 }
  ];

  // Quiz completion
  if (currentSection === 'quiz' && answeredQuestions === quizQuestions.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, quizQuestions.length);
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
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Geometry Master!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {quizQuestions.length}!
          </p>
          <div className="mb-6">
            <div className="text-lg font-semibold text-blue-600">
              Accuracy: {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              You've mastered angles and triangles!
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Quiz Again
            </button>
            <button
              onClick={() => setCurrentSection('angles')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
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
        type="star"
        message="Geometry Genius!"
        subMessage="Perfect Answer!"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Section Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Geometry Explorer</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentSection('angles')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentSection === 'angles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Angles
            </button>
            <button
              onClick={() => setCurrentSection('triangles')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentSection === 'triangles'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Triangles
            </button>
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center ${
                currentSection === 'quiz'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Play className="w-4 h-4 mr-1" />
              Quiz
            </button>
          </div>
        </div>

        {/* Angles Section */}
        {currentSection === 'angles' && (
          <>
            {showInfo && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="font-bold text-green-800 mb-2">Acute Angle</h3>
                  <p className="text-green-700 text-sm">Less than 90°</p>
                  <p className="text-green-600 text-xs mt-1">Sharp and pointed</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-bold text-blue-800 mb-2">Right Angle</h3>
                  <p className="text-blue-700 text-sm">Exactly 90°</p>
                  <p className="text-blue-600 text-xs mt-1">Perfect corner shape</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="font-bold text-red-800 mb-2">Obtuse Angle</h3>
                  <p className="text-red-700 text-sm">Greater than 90°</p>
                  <p className="text-red-600 text-xs mt-1">Wide and open</p>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  {drawAngle(angle)}
                </div>
                
                <div className={`${angleInfo.bgColor} rounded-lg p-4 text-center`}>
                  <h3 className={`text-2xl font-bold ${angleInfo.color} mb-2`}>
                    {angleInfo.name}
                  </h3>
                  <p className={`${angleInfo.color} text-lg`}>
                    {angle}° - {angleInfo.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Adjust the Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="179"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>1° (Acute)</span>
                    <span>90° (Right)</span>
                    <span>179° (Obtuse)</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Try These Angles:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {presetAngles.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setAngle(preset.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          angle === preset.value
                            ? 'border-blue-500 bg-blue-50 text-blue-800'
                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="font-semibold">{preset.name}</div>
                        <div className="text-sm text-gray-600">{preset.value}°</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setAngle(45)}
                  className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset to 45°
                </button>
              </div>
            </div>
          </>
        )}

        {/* Triangles Section */}
        {currentSection === 'triangles' && (
          <>
            <div className="mb-8">
              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400 mb-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">🔍 Amazing Triangle Fact!</h3>
                <p className="text-yellow-700 text-lg">
                  <strong>ALL triangles have angles that add up to exactly 180°!</strong>
                </p>
                <p className="text-yellow-600 text-sm mt-2">
                  This is true for every triangle, no matter what shape or size. Try the examples below!
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  {drawTriangle(triangleType)}
                </div>
                
                <div className={`bg-blue-50 rounded-lg p-4 text-center border-l-4 border-blue-400`}>
                  <h3 className={`text-2xl font-bold ${getTriangleInfo(triangleType).color} mb-2`}>
                    {getTriangleInfo(triangleType).name}
                  </h3>
                  <p className={`${getTriangleInfo(triangleType).color} text-lg mb-2`}>
                    {getTriangleInfo(triangleType).description}
                  </p>
                  <div className="bg-green-100 rounded-lg p-3 mt-3">
                    <p className="text-green-800 font-bold">
                      Angles: {getTriangleInfo(triangleType).angles.join('° + ')}° = 180°
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Triangle Types:</h3>
                  <div className="space-y-2">
                    {[
                      { type: 'equilateral', name: 'Equilateral', desc: 'All sides equal' },
                      { type: 'isosceles', name: 'Isosceles', desc: 'Two sides equal' },
                      { type: 'scalene', name: 'Scalene', desc: 'All sides different' },
                      { type: 'right', name: 'Right', desc: 'Has a 90° angle' }
                    ].map((triangle) => (
                      <button
                        key={triangle.type}
                        onClick={() => setTriangleType(triangle.type as any)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          triangleType === triangle.type
                            ? 'border-blue-500 bg-blue-50 text-blue-800'
                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="font-semibold">{triangle.name} Triangle</div>
                        <div className="text-sm text-gray-600">{triangle.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                  <h4 className="font-bold text-purple-800 mb-2">Try This!</h4>
                  <p className="text-purple-700 text-sm mb-3">
                    Click different triangle types and watch how the angles change, but they always add up to 180°!
                  </p>
                  <button
                    onClick={() => setShowTriangleAngles(!showTriangleAngles)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  >
                    {showTriangleAngles ? 'Hide' : 'Show'} Angle Labels
                  </button>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h4 className="font-bold text-blue-800 mb-2">🌟 Fun Facts</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• A straight line is 180° - same as triangle angles!</li>
                    <li>• Equilateral triangles have all 60° angles</li>
                    <li>• Right triangles always have one 90° angle</li>
                    <li>• The biggest angle is opposite the longest side</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quiz Section */}
        {currentSection === 'quiz' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Geometry Quiz</h3>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="bg-purple-50 rounded-lg p-8 mb-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  {quizQuestions[currentQuestionIndex].question}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleQuizAnswer(index)}
                    disabled={showResult}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      showResult
                        ? index === quizQuestions[currentQuestionIndex].correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                        : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{option}</span>
                      {showResult && index === quizQuestions[currentQuestionIndex].correct && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {showResult && selectedAnswer === index && index !== quizQuestions[currentQuestionIndex].correct && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-bold text-blue-800 mb-2">Explanation:</h4>
                  <p className="text-blue-700">
                    {quizQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mb-6">
              Progress: {currentQuestionIndex + 1} of {quizQuestions.length} questions
            </p>

            {/* Score display */}
            <div className="text-center">
              <div className="inline-flex items-center bg-purple-100 rounded-lg px-4 py-2">
                <Trophy className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">
                  Score: {score}/{answeredQuestions}
                </span>
              </div>
            </div>
          </>
        )}

        {/* General Tips */}
        {currentSection !== 'quiz' && (
          <div className="mt-8 bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">🎯 Geometry Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-yellow-700 text-sm">
              <div>
                <p className="mb-2">• Angles are everywhere: corners, pizza slices, clock hands!</p>
                <p className="mb-2">• Right angles make perfect corners (like book corners)</p>
                <p>• Acute angles are in triangular roofs</p>
              </div>
              <div>
                <p className="mb-2">• All triangle angles ALWAYS add to 180°</p>
                <p className="mb-2">• A straight line is also 180°</p>
                <p>• Practice with the quiz to test your knowledge!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnglesActivity;