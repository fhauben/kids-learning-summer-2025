import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, Target, CheckCircle, XCircle, RotateCcw, Settings, Lightbulb } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface SimpleMachinesProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Lever {
  id: string;
  name: string;
  type: 'first' | 'second' | 'third';
  description: string;
  fulcrumPosition: number; // 0-100
  loadPosition: number; // 0-100
  effortPosition: number; // 0-100
  loadWeight: number; // kg
  effortForce: number; // N
  mechanicalAdvantage: number;
  examples: string[];
  image: string;
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  objective: string;
  materials: string[];
  steps: string[];
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}

const SimpleMachines: React.FC<SimpleMachinesProps> = ({ onBack, onSaveProgress }) => {
  const [currentView, setCurrentView] = useState<'main' | 'levers' | 'experiments' | 'quiz' | 'simulator'>('main');
  const [selectedLever, setSelectedLever] = useState<Lever | null>(null);
  const [currentExperiment, setCurrentExperiment] = useState<Experiment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [simulatorValues, setSimulatorValues] = useState({
    fulcrum: 50,
    load: 20,
    effort: 80,
    loadWeight: 10,
    effortForce: 5
  });
  
  const { playCorrect, playIncorrect } = useSoundEffects();

  const levers: Lever[] = [
    {
      id: 'first-class',
      name: 'First Class Lever',
      type: 'first',
      description: 'Fulcrum is between the load and effort',
      fulcrumPosition: 50,
      loadPosition: 20,
      effortPosition: 80,
      loadWeight: 10,
      effortForce: 5,
      mechanicalAdvantage: 2,
      examples: ['Seesaw', 'Scissors', 'Crowbar', 'Pliers'],
      image: '⚖️'
    },
    {
      id: 'second-class',
      name: 'Second Class Lever',
      type: 'second',
      description: 'Load is between the fulcrum and effort',
      fulcrumPosition: 10,
      loadPosition: 30,
      effortPosition: 80,
      loadWeight: 10,
      effortForce: 4,
      mechanicalAdvantage: 2.5,
      examples: ['Wheelbarrow', 'Nutcracker', 'Bottle opener', 'Door'],
      image: '🛒'
    },
    {
      id: 'third-class',
      name: 'Third Class Lever',
      type: 'third',
      description: 'Effort is between the fulcrum and load',
      fulcrumPosition: 10,
      loadPosition: 80,
      effortPosition: 30,
      loadWeight: 10,
      effortForce: 20,
      mechanicalAdvantage: 0.5,
      examples: ['Baseball bat', 'Fishing rod', 'Tweezers', 'Human arm'],
      image: '🏏'
    }
  ];

  const experiments: Experiment[] = [
    {
      id: 'lever-balance',
      title: 'Lever Balance Experiment',
      description: 'Learn how to balance different weights using a lever',
      objective: 'Understand how the position of the fulcrum affects the balance of a lever',
      materials: ['Ruler or stick', 'Pencil (fulcrum)', 'Small objects of different weights', 'Paper clips'],
      steps: [
        'Place a pencil on a flat surface to act as the fulcrum',
        'Balance a ruler on the pencil',
        'Place a paper clip on one end of the ruler',
        'Add paper clips to the other end until the ruler balances',
        'Try moving the fulcrum to different positions and repeat',
        'Record your observations'
      ],
      questions: [
        {
          question: 'When the fulcrum is in the center, how many paper clips do you need on each side to balance?',
          options: ['Equal number', 'More on the left', 'More on the right', 'It depends on the weight'],
          answer: 'Equal number',
          explanation: 'When the fulcrum is in the center, the lever is balanced when both sides have equal weight.'
        },
        {
          question: 'What happens when you move the fulcrum closer to one end?',
          options: ['That side becomes lighter', 'That side becomes heavier', 'Nothing changes', 'The lever tips over'],
          answer: 'That side becomes lighter',
          explanation: 'Moving the fulcrum closer to one end makes that side lighter because the load arm becomes shorter.'
        }
      ]
    },
    {
      id: 'mechanical-advantage',
      title: 'Mechanical Advantage Investigation',
      description: 'Measure and compare the mechanical advantage of different lever setups',
      objective: 'Calculate mechanical advantage and understand its meaning',
      materials: ['Ruler', 'Pencil', 'Spring scale', 'Weights', 'Calculator'],
      steps: [
        'Set up a first-class lever with the fulcrum in the center',
        'Measure the distance from fulcrum to load (load arm)',
        'Measure the distance from fulcrum to effort (effort arm)',
        'Calculate mechanical advantage = effort arm ÷ load arm',
        'Try different fulcrum positions and recalculate',
        'Compare the results'
      ],
      questions: [
        {
          question: 'What is the mechanical advantage when the effort arm is twice as long as the load arm?',
          options: ['0.5', '1', '2', '4'],
          answer: '2',
          explanation: 'Mechanical advantage = effort arm ÷ load arm = 2 ÷ 1 = 2'
        },
        {
          question: 'A mechanical advantage greater than 1 means:',
          options: ['You need more effort than load', 'You need less effort than load', 'The lever is balanced', 'The lever is broken'],
          answer: 'You need less effort than load',
          explanation: 'A mechanical advantage > 1 means the machine makes work easier by requiring less effort force.'
        }
      ]
    }
  ];

  const questions = [
    {
      question: 'Which type of lever has the fulcrum between the load and effort?',
      options: ['First class', 'Second class', 'Third class', 'Fourth class'],
      answer: 'First class',
      explanation: 'First class levers have the fulcrum positioned between the load and effort forces.'
    },
    {
      question: 'What is the formula for mechanical advantage of a lever?',
      options: ['Load arm ÷ Effort arm', 'Effort arm ÷ Load arm', 'Load ÷ Effort', 'Effort ÷ Load'],
      answer: 'Effort arm ÷ Load arm',
      explanation: 'Mechanical advantage = effort arm ÷ load arm. This tells us how much the lever multiplies our effort.'
    },
    {
      question: 'Which of these is an example of a second-class lever?',
      options: ['Seesaw', 'Wheelbarrow', 'Baseball bat', 'Scissors'],
      answer: 'Wheelbarrow',
      explanation: 'A wheelbarrow is a second-class lever where the load (dirt) is between the fulcrum (wheel) and effort (hands).'
    },
    {
      question: 'What happens to mechanical advantage when you move the fulcrum closer to the load?',
      options: ['It increases', 'It decreases', 'It stays the same', 'It becomes zero'],
      answer: 'It increases',
      explanation: 'Moving the fulcrum closer to the load makes the effort arm longer relative to the load arm, increasing mechanical advantage.'
    },
    {
      question: 'Which type of lever requires the most effort force?',
      options: ['First class', 'Second class', 'Third class', 'They all require the same effort'],
      answer: 'Third class',
      explanation: 'Third-class levers have the effort between the fulcrum and load, making them less efficient and requiring more effort force.'
    }
  ];

  const startLevers = () => {
    setCurrentView('levers');
  };

  const startExperiments = () => {
    setCurrentView('experiments');
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const startSimulator = () => {
    setCurrentView('simulator');
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const question = questions[currentQuestion];
    const correct = answer === question.answer;
    setIsCorrect(correct);
    
    if (correct) {
      playCorrect();
      setScore(score + 1);
    } else {
      playIncorrect();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
        if (onSaveProgress) {
          onSaveProgress(score + (correct ? 1 : 0), questions.length);
        }
      }
    }, 1500);
  };

  const calculateMechanicalAdvantage = () => {
    const effortArm = Math.abs(simulatorValues.effort - simulatorValues.fulcrum);
    const loadArm = Math.abs(simulatorValues.load - simulatorValues.fulcrum);
    return loadArm > 0 ? effortArm / loadArm : 0;
  };

  const calculateEffortForce = () => {
    const ma = calculateMechanicalAdvantage();
    return ma > 0 ? simulatorValues.loadWeight / ma : 0;
  };

  const isBalanced = () => {
    const effortForce = calculateEffortForce();
    return Math.abs(effortForce - simulatorValues.effortForce) < 0.5;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to 5th Grade Science
      </button>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={score}
        total={questions.length}
        message="Physics Master!"
      />

      {currentView === 'main' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-yellow-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Simple Machines & Levers</h1>
            </div>
            <p className="text-gray-600">Discover how levers make work easier and explore the physics of simple machines!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {levers.map((lever) => (
              <div
                key={lever.id}
                className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setSelectedLever(lever);
                  setCurrentView('levers');
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{lever.image}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{lever.name}</h3>
                  <p className="text-gray-600 mb-4">{lever.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    MA: {lever.mechanicalAdvantage}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startLevers}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Lever Explorer
            </button>
            <button
              onClick={startSimulator}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
            >
              <Settings className="w-5 h-5 mr-2" />
              Lever Simulator
            </button>
            <button
              onClick={startExperiments}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Experiments
            </button>
            <button
              onClick={startQuiz}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
          </div>
        </div>
      )}

      {currentView === 'levers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Lever Explorer</h2>
              <p className="text-gray-600">Learn about different types of levers and their applications</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {selectedLever ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <span className="text-6xl mr-4">{selectedLever.image}</span>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{selectedLever.name}</h3>
                  <p className="text-gray-600 text-lg">{selectedLever.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Key Characteristics</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fulcrum Position: {selectedLever.fulcrumPosition}%</li>
                    <li>• Load Position: {selectedLever.loadPosition}%</li>
                    <li>• Effort Position: {selectedLever.effortPosition}%</li>
                    <li>• Mechanical Advantage: {selectedLever.mechanicalAdvantage}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Real-World Examples</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLever.examples.map((example, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {levers.map((lever) => (
                <div
                  key={lever.id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setSelectedLever(lever)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{lever.image}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{lever.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{lever.description}</p>
                    <div className="text-xs text-gray-500">Click to explore</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentView === 'simulator' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Lever Simulator</h2>
              <p className="text-gray-600">Experiment with different lever configurations</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visual Lever */}
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Lever Visualization</h3>
                <div className="relative h-32 bg-white rounded border-2 border-gray-300">
                  {/* Fulcrum */}
                  <div 
                    className="absolute top-0 w-4 h-32 bg-red-500"
                    style={{ left: `${simulatorValues.fulcrum}%` }}
                  />
                  {/* Load */}
                  <div 
                    className="absolute bottom-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ left: `${simulatorValues.load}%` }}
                  >
                    {simulatorValues.loadWeight}kg
                  </div>
                  {/* Effort */}
                  <div 
                    className="absolute bottom-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ left: `${simulatorValues.effort}%` }}
                  >
                    {simulatorValues.effortForce}N
                  </div>
                  {/* Lever arm */}
                  <div className="absolute top-16 left-0 right-0 h-2 bg-gray-600" />
                </div>
                
                <div className="mt-4 text-center">
                  <div className={`text-lg font-bold ${isBalanced() ? 'text-green-600' : 'text-red-600'}`}>
                    {isBalanced() ? '✓ Balanced' : '✗ Not Balanced'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Mechanical Advantage: {calculateMechanicalAdvantage().toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Adjust Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fulcrum Position: {simulatorValues.fulcrum}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={simulatorValues.fulcrum}
                      onChange={(e) => setSimulatorValues({...simulatorValues, fulcrum: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Position: {simulatorValues.load}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={simulatorValues.load}
                      onChange={(e) => setSimulatorValues({...simulatorValues, load: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effort Position: {simulatorValues.effort}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={simulatorValues.effort}
                      onChange={(e) => setSimulatorValues({...simulatorValues, effort: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Weight: {simulatorValues.loadWeight} kg
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={simulatorValues.loadWeight}
                      onChange={(e) => setSimulatorValues({...simulatorValues, loadWeight: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effort Force: {simulatorValues.effortForce} N
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={simulatorValues.effortForce}
                      onChange={(e) => setSimulatorValues({...simulatorValues, effortForce: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <button
                    onClick={() => setSimulatorValues({
                      fulcrum: 50,
                      load: 20,
                      effort: 80,
                      loadWeight: 10,
                      effortForce: 5
                    })}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'experiments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Science Experiments</h2>
              <p className="text-gray-600">Hands-on experiments to explore levers and simple machines</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {currentExperiment ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentExperiment.title}</h3>
                <p className="text-gray-600">{currentExperiment.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Objective</h4>
                  <p className="text-gray-600 mb-4">{currentExperiment.objective}</p>
                  
                  <h4 className="font-semibold text-gray-700 mb-3">Materials Needed</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {currentExperiment.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Steps</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    {currentExperiment.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {experiments.map((experiment) => (
                <div
                  key={experiment.id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setCurrentExperiment(experiment)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{experiment.title}</h3>
                  <p className="text-gray-600 mb-4">{experiment.description}</p>
                  <div className="text-sm text-gray-500">Click to view experiment</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple Machines Quiz</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>

          {!showResults ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{option}</span>
                      {selectedAnswer === option && (
                        isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer && (
                <div className={`mt-6 p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h3>
              <p className="text-xl text-gray-600 mb-6">
                You got {score} out of {questions.length} questions correct!
              </p>
              
              {score >= 4 && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowCelebration(true)}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    🏆 Celebrate!
                  </button>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={startQuiz}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setCurrentView('main')}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Back to Main
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleMachines; 