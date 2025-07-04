import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Thermometer, Zap, Target, CheckCircle, XCircle } from 'lucide-react';
import { MatterState, statesOfMatterQuestions, getRandomQuestions, matterStates as fullMatterStates } from '../../../data/scienceData';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface StatesOfMatterProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const StatesOfMatter: React.FC<StatesOfMatterProps> = ({ onBack, onSaveProgress }) => {
  const [currentView, setCurrentView] = useState<'main' | 'simulator' | 'quiz' | 'info'>('main');
  const [selectedState, setSelectedState] = useState<MatterState | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [temperature, setTemperature] = useState(20); // Celsius
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const { playCorrect, playIncorrect } = useSoundEffects();

  const questions = getRandomQuestions('states-of-matter', 5);



  const matterStates = [
    { name: 'Solid', color: '#4F46E5', icon: '🧊' },
    { name: 'Liquid', color: '#06B6D4', icon: '💧' },
    { name: 'Gas', color: '#10B981', icon: '💨' }
  ];



  // Particle simulation
  const initParticles = (state: string) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not ready');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context not ready');
      return;
    }

    console.log('Initializing particles for:', state);

    const particles: Particle[] = [];
    const particleCount = state === 'Solid' ? 50 : state === 'Liquid' ? 40 : 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        vx: state === 'Solid' ? 0 : (Math.random() - 0.5) * 2,
        vy: state === 'Solid' ? 0 : (Math.random() - 0.5) * 2,
        radius: 4,
        color: state === 'Solid' ? '#4F46E5' : state === 'Liquid' ? '#06B6D4' : '#10B981'
      });
    }

    particlesRef.current = particles;
    console.log('Particles created:', particles.length);
    
    // Draw initial particles immediately
    drawParticles();
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not ready for drawing');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context not ready for drawing');
      return;
    }

    console.log('Drawing particles:', particlesRef.current.length);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    });
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isSimulating) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x <= particle.radius || particle.x >= canvas.width - particle.radius) {
        particle.vx *= -1;
      }
      if (particle.y <= particle.radius || particle.y >= canvas.height - particle.radius) {
        particle.vy *= -1;
      }

      // Keep particles in bounds
      particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
      particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    });

    animationRef.current = requestAnimationFrame(animateParticles);
  };

  useEffect(() => {
    if (isSimulating) {
      animateParticles();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating]);

  // Draw particles when simulator view is loaded
  useEffect(() => {
    if (currentView === 'simulator' && selectedState) {
      // Wait for canvas to be available
      const timer = setTimeout(() => {
        if (canvasRef.current && particlesRef.current.length === 0) {
          initParticles(selectedState.name);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [currentView, selectedState]);

  const startSimulation = (state: string) => {
    const stateData = fullMatterStates.find(s => s.name === state);
    setSelectedState(stateData || null);
    setCurrentView('simulator');
    
    // Initialize particles immediately and start simulation
    initParticles(state);
    setIsSimulating(true);
  };

  const handleTemperatureChange = (newTemp: number) => {
    setTemperature(newTemp);
    
    // Adjust particle behavior based on temperature
    particlesRef.current.forEach(particle => {
      const baseSpeed = 1;
      const speedMultiplier = newTemp / 20;
      
      // For solids, particles should still vibrate slightly
      if (selectedState?.name === 'Solid') {
        particle.vx = (Math.random() - 0.5) * baseSpeed * speedMultiplier * 0.1;
        particle.vy = (Math.random() - 0.5) * baseSpeed * speedMultiplier * 0.1;
      } else {
        // For liquids and gases, particles move more freely
        const maxSpeed = selectedState?.name === 'Liquid' ? 2 : 4;
        particle.vx = (Math.random() - 0.5) * maxSpeed * speedMultiplier;
        particle.vy = (Math.random() - 0.5) * maxSpeed * speedMultiplier;
      }
    });
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
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

  const getStateInfo = (stateName: string) => {
    const state = fullMatterStates.find(s => s.name === stateName);
    const displayState = matterStates.find(s => s.name === stateName);
    if (!state || !displayState) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">{displayState.icon}</span>
          <h3 className="text-2xl font-bold text-gray-800">{state.name}</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Properties:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {state.properties.map((prop: string, index: number) => (
                <li key={index}>{prop}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Examples:</h4>
            <div className="flex flex-wrap gap-2">
              {state.examples.map((example: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {example}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Particle Behavior:</h4>
            <p className="text-gray-600">{state.particleBehavior}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Temperature:</h4>
            <p className="text-gray-600">{state.temperature}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to 3rd Grade
      </button>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={score}
        total={questions.length}
        message="Science Master!"
      />

      {currentView === 'main' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">States of Matter</h1>
            </div>
            <p className="text-gray-600">Learn about solids, liquids, and gases through interactive experiments!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {matterStates.map((state) => (
              <div
                key={state.name}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-purple-300 transition-all duration-200 cursor-pointer"
                onClick={() => startSimulation(state.name)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{state.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{state.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {state.name === 'Solid' && 'Definite shape and volume'}
                    {state.name === 'Liquid' && 'Definite volume, no definite shape'}
                    {state.name === 'Gas' && 'No definite shape or volume'}
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Explore {state.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startQuiz}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
          </div>
        </div>
      )}

      {currentView === 'simulator' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Particle Simulator</h2>
              <p className="text-gray-600">Watch how particles behave in {selectedState?.name.toLowerCase()} state</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isSimulating ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => initParticles(selectedState?.name || 'Solid')}
                  className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Thermometer className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-600">Temperature: {temperature}°C</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temperature}
                  onChange={(e) => handleTemperatureChange(parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            </div>
            
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="border-2 border-gray-300 rounded-lg mx-auto block"
            />
          </div>

          {selectedState && getStateInfo(selectedState.name)}
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">States of Matter Quiz</h2>
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

export default StatesOfMatter; 